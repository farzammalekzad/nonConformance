import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewNcPageRoutingModule } from './new-nc-routing.module';
import {SharedModule} from '../../shared/shared.module';
import * as moment from 'jalali-moment';
import {ImagePickerComponent} from '../../shared/picker/image-picker/image-picker.component';
import {NewNcPage} from './new-nc.page';


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
