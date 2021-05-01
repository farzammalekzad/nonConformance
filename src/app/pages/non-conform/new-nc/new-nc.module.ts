import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewNcPageRoutingModule } from './new-nc-routing.module';
import {NewNcPage} from './new-nc.page';
import {SharedModule} from '../../shared/shared.module';
import * as moment from 'jalali-moment';
import {ImagePickerComponent} from '../../shared/picker/image-picker/image-picker.component';

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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewNcPageRoutingModule,
    SharedModule
  ],
  exports: [
  ],
  declarations: [NewNcPage, ImagePickerComponent]
})
export class NewNcPageModule {}
