import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {UserModel} from './User.model';
import {map, take, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Storage} from '@capacitor/storage';

interface ResData {
  success: boolean;
  token: string;
  message: string;
  userId: string;
  fullname: string;
  email: string;
  admin: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    _user = new BehaviorSubject<UserModel>(null);
    success = false;

   get userId() {
     return this._user.asObservable().pipe(map(user => {
       if (!user) {
         return null;
       }
       return user.id;
     }));
   }
   get userIsAuthenticated() {
     return this._user.asObservable().pipe(map(user => {
       if (user) {
         return !!user.token;
       } else {
         return false;
       }
     }));
   }

  constructor(private http: HttpClient, private route: Router) { }



  login(email: string, password: string) {
     let user: UserModel;
     return this.http.post<ResData>('http://localhost:3000/user/login', {email, password})
      .pipe(map(resData => {
        user = {
          id: resData.userId,
          fullname: resData.fullname,
          email: resData.email,
          admin: resData.admin,
          token: resData.token
        };
        this.success = resData.success;
        this._user.next(user);
        this.storeAuthData(user.id, user.fullname, user.email, user.admin, user.token );
      }));
  }

  onLogout() {
     this._user.next(null);
     this.route.navigateByUrl('/auth');
  }
   autoLogin() {

    from(Storage.get({key: 'authData'})).pipe(take(1), map(authData => {
       if (!authData || !authData.value) {
         return null;
       }
       const parseData = JSON.parse(authData.value) as {
         id: string,
         fullname: string,
         email: string,
         admin: boolean,
         token: string,
       };
       return parseData;
     }), tap(parseData => {
        this._user.next(parseData);
     }));
  }

  async storeAuthData(
    id: string,
    fullname: string,
    email: string,
    admin: boolean,
    token: string) {
     const data = JSON.stringify({id, fullname, email, admin, token});
     await Storage.set({key: 'authData', value: data});
  }

  /*useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this._user.next(credentials);
  }

  async loadUserCredentials() {
    const value = await Storage.get({key: 'authData'});
    const credentials = JSON.parse(value.t);
    console.log('loadUserCredentials ', credentials);
    if (credentials && credentials.token !== undefined) {
      this.useCredentials(credentials);
    }
  }*/
}
