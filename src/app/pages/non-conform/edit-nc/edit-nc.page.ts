import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {NcService} from '../nc.service';
import {NonconformModel} from '../nonconform.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-nc',
  templateUrl: './edit-nc.page.html',
  styleUrls: ['./edit-nc.page.scss'],
})
export class EditNcPage implements OnInit, OnDestroy {
  nonConformity: NonconformModel;
  private ncSub: Subscription;
  form: FormGroup;
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private ncService: NcService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController
              ) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((pm) => {
      if (!pm.has('ncId')) {
        this.navCtrl.navigateBack('/non-conform/tabs/discover');
        return;
      }
      this.ncSub = this.ncService.getNcById(pm.get('ncId')).subscribe((nc) => {
        this.nonConformity = nc;
        this.form = new FormGroup({
            status: new FormControl(this.nonConformity.status),
            title: new FormControl(this.nonConformity.title, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.minLength(5)]
            }),
            description: new FormControl(this.nonConformity.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.minLength(5)]
            }),
            severity: new FormControl(this.nonConformity.severity, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            sphere: new FormControl(this.nonConformity.sphere, {
              updateOn: 'blur',
              validators: [Validators.required]
            }),
            ref: new FormControl(this.nonConformity.reference, {
              updateOn: 'blur',
              validators: [Validators.required]
            })
          }
        );
        this.isLoading = false;
      }, async error => {
       const alert =  await this.alertCtrl.create({
          header: 'خطا',
          message: 'لطفا مجددا تلاش کنید',
          buttons: [{
            text: 'باشه',
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
 async onEditNc() {
    const loading = await this.loadingCtrl.create({
      message: 'در حال بروزرسانی...',
      duration: 2000
    });
    await loading.present();
    this.ncService.editNcs(
      this.nonConformity.id,
      this.form.value.title,
      this.form.value.description,
      this.form.value.severity,
      this.form.value.sphere,
      this.form.value.ref,
      this.form.value.status
    ).subscribe(() => {
      loading.dismiss();
      this.navCtrl.navigateBack('/non-conform/tabs/discover');
    });
  }

  ngOnDestroy() {
    if (this.ncSub) {
      this.ncSub.unsubscribe();
    }
  }
}
