import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminGuard } from './super-admin-guard.service';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { LoginComponent } from 'app/components';

import {
  MediaHouseListComponent,
  MediaHouseListResolver,
  MediaHouseComponent,
  MediaHouseResolver
} from 'app/directory';

import {
  RateCardListComponent,
  RateCardListResolver,
  RateCardComponent,
  RateCardResolver,
  RateCardDetailsComponent
} from 'app/rate-card';

const routes: Routes = [
  {
    path: '',
    data: { superAdmin: true },
    canActivate: [SuperAdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperAdminDashboardComponent },
      { path: 'categories', component: AdCategoriesComponent },
      {
        path: 'media_houses',
        data: { global: true },
        children: [
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
      {
        path: 'ratecards',
        data: { global: true },
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: RateCardListComponent,
            resolve: {
              list: RateCardListResolver
            }
          },
          { path: 'new', component: RateCardComponent },
          {
            path: 'new/:copy',
            component: RateCardComponent,
            resolve: {
              rateCard: RateCardResolver
            }
          },
          {
            path: 'edit/:id',
            component: RateCardComponent,
            resolve: {
              rateCard: RateCardResolver
            }
          },
          {
            path: ':id',
            component: RateCardDetailsComponent,
            resolve: {
              rateCard: RateCardResolver
            }
          }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent, data: { superAdmin: true } }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule { }
