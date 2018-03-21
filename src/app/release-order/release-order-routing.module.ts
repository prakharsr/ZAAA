import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseOrderComponent } from './release-order/release-order.component';

const routes: Routes = [
  { path: 'releaseorders', component: ReleaseOrderComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ReleaseOrderRoutingModule { }
