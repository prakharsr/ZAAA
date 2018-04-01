import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'categories', component: AdCategoriesComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule { }
