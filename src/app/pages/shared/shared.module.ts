import {NgModel} from '@angular/forms';
import {LocationModalComponent} from './location-modal/location-modal.component';
import {LocationPickerComponent} from './picker/location-picker/location-picker.component';
import {CommonModule} from '@angular/common';
import {NgModule, Pipe, PipeTransform} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {NgxMapboxGLModule} from 'mapir-angular-component';
import * as moment from 'jalali-moment';
import {Map} from 'mapir-angular';

@Pipe({
  name: 'jalali'
})
export class JalaliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const MomentDate = moment(value, 'YYYY/MM/DD');
    return MomentDate.locale('fa').format('D MMM YYYY');
  }
}

@NgModule({
  declarations: [LocationModalComponent, LocationPickerComponent, JalaliPipe],
  imports: [CommonModule, IonicModule, NgxMapboxGLModule, Map],
  exports: [LocationPickerComponent, LocationModalComponent, JalaliPipe],
  entryComponents: [LocationModalComponent]
})

export class SharedModule {}
