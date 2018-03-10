import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirComponent } from './dir/dir.component';

import { DirClientComponent } from './clients/dir-client/dir-client.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';

import { DirExecutiveComponent } from './executives/dir-executive/dir-executive.component';

import { DirMediaHouseComponent } from './media-houses/dir-media-house/dir-media-house.component';

const routes: Routes = [
  {
    path: 'dir',
    component: DirComponent,
    children: [
      {
        path: 'clients',
        children: [          
          { path: '', component: ClientListComponent },
          { path: 'new', component: DirClientComponent },
          { path: 'edit/:id', component: DirClientComponent },
          { path: ':id', component: ClientDetailsComponent },
        ]
      },
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
