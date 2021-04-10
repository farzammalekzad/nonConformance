import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {NcService} from '../nc.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {subscribeTo} from 'rxjs/internal-compatibility';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-nc',
  templateUrl: './new-nc.page.html',
  styleUrls: ['./new-nc.page.scss'],
})
export class NewNcPage implements OnInit, OnDestroy {

  today: Date = new Date(Date.now());
  form: FormGroup;
  private ncSub: Subscription;

  constructor(private ncService: NcService, private router: Router, private loadingCtrl: LoadingController) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(20)]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(150)]
      }),
      location: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(25)]
      }),
      severity: new FormControl('غیر بحرانی', {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      sphere: new FormControl('طراحی', {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ref: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  ngOnInit() {
  }

   async newNonConformity() {
    const loading = await this.loadingCtrl.create({
      message: 'در حال بارگذاری...',
    });
    await loading.present();
    this.ncSub = this.ncService.addNc(
      this.form.value.title,
      this.form.value.description,
      this.form.value.location,
      this.form.value.severity,
      this.form.value.sphere,
      this.form.value.ref
    ).subscribe(() => {
      this.form.reset();
      loading.dismiss();
      this.router.navigateByUrl('/non-conform/tabs/discover');
    });
  }
  ngOnDestroy() {
    if (this.ncSub) {
      this.ncSub.unsubscribe();
    }
  }
}
