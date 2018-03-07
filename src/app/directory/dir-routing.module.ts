import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirClientComponent } from './dir-client/dir-client.component';
import { DirExecutiveComponent } from './dir-executive/dir-executive.component';
import { DirMediaHouseComponent } from './dir-media-house/dir-media-house.component';

const routes: Routes = [
  { path: 'dir/client', component: DirClientComponent },
  { path: 'dir/executive', component: DirExecutiveComponent },
  { path: 'dir/media_house', component: DirMediaHouseComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DirRoutingModule { }
