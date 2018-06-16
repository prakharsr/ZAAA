import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';
import { ReportsHomeComponent } from './reports-home/reports-home.component';

const routes: Routes = [
  {
    path: 'reports',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ReportsHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReportsRoutingModule { }
