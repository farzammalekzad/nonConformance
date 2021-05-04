import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {NcService} from '../nc.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import * as moment from 'jalali-moment';
import {environment} from '../../../../environments/environment';



function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}



@Component({
  selector: 'app-new-nc',
  templateUrl: './new-nc.page.html',
  styleUrls: ['./new-nc.page.scss'],
})

export class NewNcPage implements OnInit, OnDestroy {

  today: Date = new Date(Date.now());
  form: FormGroup;
  private ncSub: Subscription;
  showPreview = false;

  constructor(private ncService: NcService, private router: Router, private loadingCtrl: LoadingController) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(20), Validators.minLength(6)]
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
      }),
      image: new FormControl(null)
    });
  }

  ngOnInit() {
  }

   async newNonConformity() {
    const loading = await this.loadingCtrl.create({
      message: 'در حال بارگذاری...',
    });
    await loading.present();
    if (this.form.get('image').value) {
      this.ncSub = this.ncService.uploadImage(this.form.get('image').value).pipe(switchMap(resData => {
        return this.ncService.addNc(
          this.form.value.title,
          this.form.value.description,
          this.form.value.location,
          this.form.value.severity,
          this.form.value.sphere,
          this.form.value.ref,
          `${environment.baseUrl}/uploads/image/${resData.filename}`
        );
      })).subscribe(() => {
        this.form.reset();
        loading.dismiss();
        this.router.navigateByUrl('/non-conform/tabs/discover');
      });
    } else {
     this.ncSub = this.ncService.addNc(
        this.form.value.title,
        this.form.value.description,
        this.form.value.location,
        this.form.value.severity,
        this.form.value.sphere,
        this.form.value.ref,
        null
    ).subscribe(() => {
  this.form.reset();
  loading.dismiss();
  this.router.navigateByUrl('/non-conform/tabs/discover');
});
    }

  }
  show(imageData: string | File) {
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64', ''), 'image/jpeg');
      } catch (err) {
        console.log(err);
      }

    } else {
        imageFile = imageData;
    }
    this.form.patchValue({image: imageFile});
  }
  ngOnDestroy() {
    if (this.ncSub) {
      this.ncSub.unsubscribe();
    }
  }
}
