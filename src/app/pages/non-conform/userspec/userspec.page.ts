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
  isLoading = true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadingStorage().then(() => {
      this.isLoading = false;
    });
  }

  logout() {
    this.authService.onLogout();
  }

  async loadingStorage() {
    const authData = await Storage.get({key: 'authData'});
    this.userData = await JSON.parse(authData.value);
  }

}
