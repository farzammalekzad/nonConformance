import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {LocationModalComponent} from '../../location-modal/location-modal.component';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openMap() {
    const modal = await this.modalCtrl.create({
      component: LocationModalComponent,
    });
    await modal.present();
    const data = await modal.onDidDismiss();
    console.log(data);
  }

}
