import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../auth/User.model';
import {AuthService} from '../../auth/auth.service';
import {Storage} from '@capacitor/storage';

@Component({
  selector: 'app-userspec',
  templateUrl: './userspec.page.html',
  styleUrls: ['./userspec.page.scss'],
})
export class UserspecPage implements OnInit {
  userData: UserModel;

  constructor(private authService: AuthService) { }
  ngOnInit() {

   Storage.get({key: 'authData'}).then((authData) => {
     this.userData = JSON.parse(authData.value);
   });
  }

  logout() {
    this.authService.onLogout();
  }

}
