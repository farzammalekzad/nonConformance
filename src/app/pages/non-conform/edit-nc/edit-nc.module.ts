import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNcPageRoutingModule } from './edit-nc-routing.module';

import { EditNcPage } from './edit-nc.page';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
        EditNcPageRoutingModule,
        SharedModule
    ],
  declarations: [EditNcPage]
})
export class EditNcPageModule {}
