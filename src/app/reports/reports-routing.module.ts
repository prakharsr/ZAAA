import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'app/guards';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ImportExportComponent } from './import-export/import-export.component';

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
  },
  {
    path: 'import-export',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ImportExportComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReportsRoutingModule { }
