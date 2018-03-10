import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirClientComponent } from './dir-client/dir-client.component';
import { DirExecutiveComponent } from './dir-executive/dir-executive.component';
import { DirMediaHouseComponent } from './dir-media-house/dir-media-house.component';
import { DirComponent } from './dir/dir.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

const routes: Routes = [
  {
    path: 'dir',
    component: DirComponent,
    children: [
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/new', component: DirClientComponent },
      { path: 'clients/edit/:id', component: DirClientComponent },
      { path: 'clients/:id', component: ClientDetailsComponent },
      { path: 'executives', component: DirExecutiveComponent },
      { path: 'media_houses', component: DirMediaHouseComponent },
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DirRoutingModule { }
