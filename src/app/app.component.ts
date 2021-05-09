import {Component, Inject, Pipe, PipeTransform} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {AlertController, Platform} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';
import {SplashScreen} from '@capacitor/splash-screen';
import {AuthService} from './pages/auth/auth.service';
import {Network} from '@capacitor/network';
import * as moment from 'jalali-moment';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private authService: AuthService, private alertCtrl: AlertController,
              @Inject (DOCUMENT) private document: Document
  ) {
    this.document.documentElement.dir = 'rtl';
    this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {
        if (Capacitor.isPluginAvailable('SplashScreen')) {
          SplashScreen.hide();
            }
        this.logCurrentStatus();
          });
  }

   logCurrentStatus = async () => {
    const status = await Network.getStatus();
    if (!status.connected) {
      const alert = await this.alertCtrl.create({
        header: 'اتصال به اینترنت',
        message: 'شما به اینترنت متصل نمی باشید',
        buttons: ['باشه']
      });
      await alert.present();
    }
  }

}
