import {Component, OnDestroy, OnInit} from '@angular/core';
import {NcService} from '../nc.service';
import {NonconformModel} from '../nonconform.model';
import {AlertController, IonItemSliding, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  nonConformances: NonconformModel[] = [];
  isLoading = false;
  private ncSub1: Subscription;
  private ncSub2: Subscription;
  errMess: string;

  constructor(private ncService: NcService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {
     this.ncSub2 = this.ncService.getAllNc().subscribe();
  }
  ionViewWillEnter() {
    this.isLoading = true;
    this.ncSub1 = this.ncService.fetchNcs().subscribe((ncs) => {
      this.nonConformances = ncs;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.errMess = error;
    });
}

  editNc(id: string, itemSliding: IonItemSliding) {
    itemSliding.close().then(() => {
      this.router.navigate(['/', 'non-conform', 'tabs', 'edit', id ]);
    });
  }

  deleteNc(id: string, itemSliding: IonItemSliding) {
    return itemSliding.close().then(async () => {
      const userData = await Storage.get({key: 'authData'});
      const user = JSON.parse(userData.value);
      if (user.admin) {
        this.isLoading = true;
        this.ncService.deleteNc(id).subscribe(async (resp) => {
          const alert = await this.alertCtrl.create({
            header: 'حذف عدم انطباق',
            message: 'عدم انطباق با موفقیت حذف شد',
            buttons: ['باشه']
          });
          await alert.present();
          this.ionViewWillEnter();
        }, async (err) => {
          const alert = await this.alertCtrl.create({
            header: 'اشکالی رخ داده',
            message: 'عدم انطباق حذف نشد',
            buttons: ['باشه']
          });
          await alert.present();
        });
      }
      else {
        const alert = await this.alertCtrl.create({
          header: 'اشکال در سطح دسترسی',
          message: 'شما مجوز حذف عدم انطباق را ندارید',
          buttons: ['باشه']
        });
        await alert.present();
      }
    });
  }


  ngOnDestroy() {
    if (this.ncSub1 || this.ncSub2) {
      this.ncSub1.unsubscribe();
      this.ncSub2.unsubscribe();
    }
  }

}
