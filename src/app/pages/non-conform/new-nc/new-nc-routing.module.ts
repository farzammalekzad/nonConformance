import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewNcPage } from './new-nc.page';

const routes: Routes = [
  {
    path: '',
    component: NewNcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewNcPageRoutingModule {}
