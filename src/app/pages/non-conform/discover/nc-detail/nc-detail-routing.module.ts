import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NcDetailPage } from './nc-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NcDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NcDetailPageRoutingModule {}
