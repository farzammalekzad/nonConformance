import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NonconformModel} from '../../nonconform.model';
import {AlertController, NavController} from '@ionic/angular';
import {NcService} from '../../nc.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nc-detail',
  templateUrl: './nc-detail.page.html',
  styleUrls: ['./nc-detail.page.scss'],
})
export class NcDetailPage implements OnInit, OnDestroy {
  nonConformance: NonconformModel;
  private ncSub: Subscription;
  private ncSub2: Subscription;
  isLoading = false;
  userName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private ncService: NcService,
              private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.ncSub2 = this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('ncId')) {
        this.navCtrl.navigateBack('/non-conform/tabs/discover');
        return;
      }
      this.ncSub = this.ncService.getNcById(paramMap.get('ncId')).subscribe((nc) => {
        this.nonConformance = nc.nc;
        this.userName = nc.username;
        this.isLoading = false;
      }, async error => {
        const alert = await this.alertCtrl.create({
          header: '',
          message: '',
          buttons: [{
            text: '',
            role: 'cancel',
            handler: () => {
              this.navCtrl.navigateBack('/non-conform/tabs/discover');
            }
          }]
        });
        await alert.present();
      });
    });
  }

  ngOnDestroy() {
    if (this.ncSub || this.ncSub2) {
      this.ncSub.unsubscribe();
      this.ncSub2.unsubscribe();
    }
  }

}
