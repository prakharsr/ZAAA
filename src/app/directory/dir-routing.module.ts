import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirComponent } from '@aaman/dir/dir/dir.component';

import { ClientListComponent } from '@aaman/dir/clients/client-list/client-list.component';
import { ClientComponent } from '@aaman/dir/clients/client/client.component';
import { ClientResolver } from '@aaman/dir/clients/client-resolver.service';
import { ClientDetailsComponent } from '@aaman/dir/clients/client-details/client-details.component';

import { ExecutiveListComponent } from '@aaman/dir/executives/executive-list/executive-list.component';
import { ExecutiveComponent } from '@aaman/dir/executives/executive/executive.component';
import { ExecutiveResolver } from '@aaman/dir/executives/executive-resolver.service';
import { ExecutiveDetailsComponent } from '@aaman/dir/executives/executive-details/executive-details.component';

import { MediaHouseListComponent } from '@aaman/dir/media-houses/media-house-list/media-house-list.component';
import { MediaHouseComponent } from '@aaman/dir/media-houses/media-house/media-house.component';
import { MediaHouseResolver } from '@aaman/dir/media-houses/media-house-resolver.service';
import { MediaHouseDetailsComponent } from '@aaman/dir/media-houses/media-house-details/media-house-details.component';

import { AuthGuard } from '@aaman/main/auth-guard.service';
import { ClientListResolver } from '@aaman/dir/clients/client-list-resolver.service';
import { ExecutiveListResolver } from '@aaman/dir/executives/executive-list-resolver.service';
import { FirmResolver } from '@aaman/main/firm-resolver.service';
import { MediaHouseListResolver } from '@aaman/dir/media-houses/media-house-list-resolver.service';

const routes: Routes = [
  {
    path: 'dir',
    component: DirComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'clients',
        children: [          
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: ClientListComponent,
            resolve: {
              list: ClientListResolver
            }
          },
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
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: ExecutiveListComponent,
            resolve: {
              list: ExecutiveListResolver
            }
          },
          {
            path: 'new',
            component: ExecutiveComponent,
            resolve: {
              firm: FirmResolver
            }
          },
          {
            path: 'edit/:id',
            component: ExecutiveComponent,
            resolve: {
              executive: ExecutiveResolver,
              firm: FirmResolver
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
        data: {
          global: false
        },
        children: [
          {
            path: 'global',
            data: {
              global: true
            },
            children: [
              { path: '', redirectTo: 'list/1', pathMatch: 'full' },
              {
                path: 'list/:page',
                component: MediaHouseListComponent,
                resolve: {
                  list: MediaHouseListResolver
                }
              }
            ]
          },
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: MediaHouseListComponent,
            resolve: {
              list: MediaHouseListResolver
            }
          },
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
