import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserspecPage } from './userspec.page';

const routes: Routes = [
  {
    path: '',
    component: UserspecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserspecPageRoutingModule {}
