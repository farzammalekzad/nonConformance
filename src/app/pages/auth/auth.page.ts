import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {AuthProject} from './AuthProject.model';
import {BehaviorSubject} from 'rxjs';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})


export class AuthPage implements OnInit {
  errMsg: string;
  public projectAddress: string;
  projects: AuthProject[] = [];

  constructor(private authService: AuthService, private route: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    if (this.authService.userIsAuthenticated) {
      this.authService.autoLogin();
      this.route.navigateByUrl('/non-conform/tabs/discover');
    }
    this.getServerForCall();
  }
  async Authenticate(email: string, password: string, project: string) {
    console.log(project);
    const loading = await this.loadingCtrl.create({
      message: 'در حال بررسی'
    });
    await loading.present();
    await this.authService.login(email, password, project).subscribe(async (resData) => {
        if (this.authService.success === true) {
          await loading.dismiss();
          this.errMsg = null;
          return this.route.navigateByUrl('/non-conform/tabs/discover');
        }
      }, async (error) => {
        if (error.statusText === 'Unauthorized') {
          this.errMsg = 'ایمیل یا نام کاربری صحیح نمی باشد';
        }
        else {
          this.errMsg = 'مشکل ارتباط با سرور وجود دارد(12029)';
        }
        await loading.dismiss();
      });
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.projectAddress = form.value.server.serverAddress;
    return this.Authenticate(email, password, this.projectAddress);
  }
  getServerForCall() {
    return this.authService.serverAddress().subscribe(servers => {
        this.projects = servers;
    });
  }

}
