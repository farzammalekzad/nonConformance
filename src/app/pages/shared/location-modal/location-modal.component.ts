import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {Capacitor} from '@capacitor/core';
import {Geolocation} from '@capacitor/geolocation';



@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit {
  currentPosition: {lat: number, lng: number};

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) { }
  title = 'mapir-angular-test';
  center: Array<number> = [51.367918, 35.712706];
  apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzYjg4MjdkYmU2NDcwMGY2ZjM4NmVkNTJhNjQ2Y2VmZTE1YzdiZTY3M2M3MDE5OGE2NzAwM2I2OWUyMDY5MmQxNDMzMzM0OGRiMjY1ODFmIn0.eyJhdWQiOiIxMzU0OSIsImp0aSI6IjMzYjg4MjdkYmU2NDcwMGY2ZjM4NmVkNTJhNjQ2Y2VmZTE1YzdiZTY3M2M3MDE5OGE2NzAwM2I2OWUyMDY5MmQxNDMzMzM0OGRiMjY1ODFmIiwiaWF0IjoxNjE4NDA4NTQ2LCJuYmYiOjE2MTg0MDg1NDYsImV4cCI6MTYyMTAwMDU0Niwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.QtAg2JUx7zFPeZs7ehAruBFpf9h-bw3qaZrQdbr_4jkojrDImnPmYX9YxjJc7IztFI2BBAx738_TrfwtopAnMTQoSQ_Lg8t1CiqrmFzwZ3GM0-UGrKSSrYJx5ykgse4q7KgdOIiKuyDH4Ju3Ilt7rmR_olsv8_5sHw6psKDxn-OqL_sxNcJStOejxsb14mf3wq1c0r6lvyovA7w6iBPDoyEZAchGw1sO47cR4Iwd7OcY6NnuKTR2jBw1qLc6X4LAVm_L8XVUOWLa_fFaJRLqvuzd6Md1HmLaE0UvKScH8OtOb3g4v6Ab_HVoG4Fa4fK2OTRuJjizFI9XpUkHiVYo4A';

  ngOnInit() {
    this.getLocation();
  }

  cancel() {
    this.modalCtrl.dismiss(this.currentPosition);
  }

  async getLocation() {
    const coordination = await Geolocation.getCurrentPosition();
    try {
      this.currentPosition = {lat: coordination.coords.latitude, lng: coordination.coords.longitude};
    }  catch (err) {
        this.alertCtrl.create({
          header: 'خطا',
          message: 'قادر به دریافت مختصات نمی باشم',
          buttons: [{
            text: 'مجددا امتحان می کنم',
            handler: () => {
              this.modalCtrl.dismiss();
            }
          }]
        }).then((alertEl) => {
          alertEl.present();
        });
    }
  }

}
