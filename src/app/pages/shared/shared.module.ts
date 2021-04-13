import {NgModel} from '@angular/forms';
import {LocationModalComponent} from './location-modal/location-modal.component';
import {LocationPickerComponent} from './picker/location-picker/location-picker.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [LocationModalComponent, LocationPickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [LocationPickerComponent, LocationModalComponent],
  entryComponents: [LocationModalComponent]
})

export class SharedModule {}
