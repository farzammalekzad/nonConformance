import {NgModule, Pipe, PipeTransform} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NcDetailPageRoutingModule } from './nc-detail-routing.module';

import { NcDetailPage } from './nc-detail.page';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NcDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [NcDetailPage]
})
export class NcDetailPageModule {}
