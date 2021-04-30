import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NonConformPageRoutingModule } from './non-conform-routing.module';

import { NonConformPage } from './non-conform.page';
import { baseUrl } from '../shared/baseurl';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NonConformPageRoutingModule
  ],
  providers: [{provide: 'BaseURL', useValue: baseUrl}],
  declarations: [NonConformPage]
})
export class NonConformPageModule {}
