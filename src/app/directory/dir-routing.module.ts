import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirComponent } from './dir/dir.component';

import { ClientComponent } from './clients/client/client.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientResolver } from './clients/client-resolver.service';

import { ExecutiveComponent } from './executives/executive/executive.component';
import { ExecutiveListComponent } from './executives/executive-list/executive-list.component';
import { ExecutiveDetailsComponent } from './executives/executive-details/executive-details.component';
import { ExecutiveResolver } from './executives/executive-resolver.service';

import { MediaHouseComponent } from './media-houses/media-house/media-house.component';
import { MediaHouseListComponent } from './media-houses/media-house-list/media-house-list.component';
import { MediaHouseDetailsComponent } from './media-houses/media-house-details/media-house-details.component';
import { MediaHouseResolver } from './media-houses/media-house-resolver.service';

import { AuthGuard } from '../guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'dir',
    component: DirComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clients',
        children: [          
          { path: '', component: ClientListComponent },
          { path: 'new', component: ClientComponent },
          {
            path: 'edit/:id',
            component: ClientComponent,
            resolve: {
              client: ClientResolver
            }
          },
          {
            path: ':id',
            component: ClientDetailsComponent,
            resolve: {
              client: ClientResolver
            }
          },
        ]
      },
      {
        path: 'executives',
        children: [
          { path: '', component: ExecutiveListComponent },
          { path: 'new', component: ExecutiveComponent },
          {
            path: 'edit/:id',
            component: ExecutiveComponent,
            resolve: {
              executive: ExecutiveResolver
            }
          },
          {
            path: ':id',
            component: ExecutiveDetailsComponent,
            resolve: {
              executive: ExecutiveResolver
            }
          }
        ]
      },
      {
        path: 'media_houses',
        children: [
          { path: '', component: MediaHouseListComponent },
          { path: 'new', component: MediaHouseComponent },
          {
            path: 'edit/:id',
            component: MediaHouseComponent,
            resolve: {
              mediaHouse: MediaHouseResolver
            }
          },
          {
            path: ':id',
            component: MediaHouseDetailsComponent,
            resolve: {
              mediaHouse: MediaHouseResolver
            }
          }
        ]
      },
      { path: '', redirectTo: 'clients', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DirRoutingModule { }
