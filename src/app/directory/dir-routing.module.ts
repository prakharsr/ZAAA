import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirClientComponent } from './dir-client/dir-client.component';
import { DirExecutiveComponent } from './dir-executive/dir-executive.component';
import { DirMediaHouseComponent } from './dir-media-house/dir-media-house.component';
import { DirComponent } from './dir/dir.component';

const routes: Routes = [
  {
    path: 'dir',
    component: DirComponent,
    children: [
      { path: 'clients', component: DirClientComponent },
      { path: 'executives', component: DirExecutiveComponent },
      { path: 'media_houses', component: DirMediaHouseComponent }
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DirRoutingModule { }
