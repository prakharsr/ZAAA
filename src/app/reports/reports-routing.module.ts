import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ImportExportComponent } from './import-export/import-export.component';

const routes: Routes = [
  {
    path: 'reports',
    children: [
      {
        path: '',
        component: ReportsHomeComponent
      }
    ]
  },
  {
    path: 'import-export',
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
