import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserspecPageRoutingModule } from './userspec-routing.module';

import { UserspecPage } from './userspec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserspecPageRoutingModule
  ],
  declarations: [UserspecPage]
})
export class UserspecPageModule {}
