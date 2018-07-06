import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  DirComponent,

  ClientListComponent,
  ClientComponent,
  ClientResolver,
  ClientListResolver,

  ExecutiveListComponent,
  ExecutiveComponent,
  ExecutiveResolver,
  ExecutiveListResolver,

  MediaHouseListComponent,
  MediaHouseComponent,
  MediaHouseResolver,
  MediaHouseListResolver
} from '.';

import { AuthGuard } from 'app/guards';
import { FirmResolver } from 'app/services';

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
            path: ':id',
            component: ClientComponent,
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
            path: ':id',
            component: ExecutiveComponent,
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
            path: ':id',
            component: MediaHouseComponent,
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
