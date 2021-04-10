import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NonConformPage } from './non-conform.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: NonConformPage,
    children: [
      { path: 'new-nc',
        loadChildren: () => import('../non-conform/new-nc/new-nc.module').then( m => m.NewNcPageModule)
      },
      {
        path: 'discover',
        loadChildren: () => import('../non-conform/discover/discover.module').then( m => m.DiscoverPageModule)
      },
      {
        path: 'userspec',
        loadChildren: () => import('./userspec/userspec.module').then( m => m.UserspecPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
      },
      {
        path: 'edit/:ncId',
        loadChildren: () => import('../non-conform/edit-nc/edit-nc.module').then( m => m.EditNcPageModule)
      }
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NonConformPageRoutingModule {}
