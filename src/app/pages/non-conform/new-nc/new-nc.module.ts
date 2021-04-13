import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewNcPageRoutingModule } from './new-nc-routing.module';

import { NewNcPage } from './new-nc.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        NewNcPageRoutingModule,
        SharedModule
    ],
  declarations: [NewNcPage]
})
export class NewNcPageModule {}
