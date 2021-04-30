import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../auth/User.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-userspec',
  templateUrl: './userspec.page.html',
  styleUrls: ['./userspec.page.scss'],
})
export class UserspecPage implements OnInit {
  userSpec: UserModel;
  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.authService._user.subscribe(user => {
     this.userSpec = user;
   });
  }

  logout() {
    this.authService.onLogout();
  }

}
