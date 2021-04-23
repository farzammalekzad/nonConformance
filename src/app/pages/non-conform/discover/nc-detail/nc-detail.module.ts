import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NcDetailPageRoutingModule } from './nc-detail-routing.module';

import { NcDetailPage } from './nc-detail.page';
import {NewNcPageModule} from '../../new-nc/new-nc.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NcDetailPageRoutingModule,
        NewNcPageModule
    ],
  declarations: [NcDetailPage]
})
export class NcDetailPageModule {}
