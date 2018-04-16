import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    children: [
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class InvoiceRoutingModule { }
