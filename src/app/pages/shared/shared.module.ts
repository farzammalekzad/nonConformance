import {NgModel} from '@angular/forms';
import {LocationModalComponent} from './location-modal/location-modal.component';
import {LocationPickerComponent} from './picker/location-picker/location-picker.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {NgxMapboxGLModule} from 'mapir-angular-component';
import {JalaliPipe} from '../non-conform/new-nc/new-nc.module';

@NgModule({
  declarations: [LocationModalComponent, LocationPickerComponent, JalaliPipe],
  imports: [CommonModule, IonicModule, NgxMapboxGLModule],
  exports: [LocationPickerComponent, LocationModalComponent, JalaliPipe],
  entryComponents: [LocationModalComponent]
})

export class SharedModule {}
