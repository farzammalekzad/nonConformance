import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNcPage } from './edit-nc.page';

const routes: Routes = [
  {
    path: '',
    component: EditNcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNcPageRoutingModule {}
