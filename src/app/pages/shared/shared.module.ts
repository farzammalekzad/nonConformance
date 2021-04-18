import {NgModel} from '@angular/forms';
import {LocationModalComponent} from './location-modal/location-modal.component';
import {LocationPickerComponent} from './picker/location-picker/location-picker.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {NgxMapboxGLModule} from 'mapir-angular-component';
import {ImagePickerComponent} from './picker/image-picker/image-picker.component';

@NgModule({
  declarations: [LocationModalComponent, LocationPickerComponent, ImagePickerComponent],
  imports: [CommonModule, IonicModule, NgxMapboxGLModule],
  exports: [LocationPickerComponent, LocationModalComponent, ImagePickerComponent],
  entryComponents: [LocationModalComponent]
})

export class SharedModule {}
