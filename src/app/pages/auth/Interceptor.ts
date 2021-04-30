import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {Storage} from '@capacitor/storage';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class Interceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return from(Storage.get({key: 'authData'})).pipe(map(authData => {
            if (authData !== null && authData.value !== null) {
              const parseData = JSON.parse(authData.value) as {
                id: string,
                fullname: string,
                email: string,
                admin: boolean,
                token: string,
              };
              this.authService._user.next(parseData);
              return req.clone({
                    url: req.url,
                    headers: req.headers
                        .append('Authorization', 'bearer ' + parseData.token),
                    withCredentials: false
                });
            } else {
                return req.clone({
                    url: req.url,
                    headers: req.headers,
                    withCredentials: false
                });
            }
        }), switchMap((request: HttpRequest<any>) => {
            return next.handle(request);
        }));
    }
}
