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
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { TicketListComponent } from '../components/ticket-list/ticket-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';

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
      },
      {
        path: 'admins',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: AdminListComponent },
          { path: 'new', component: CreateAdminComponent }
        ]
      },
      {
        path: 'tickets',
        children: [
          { path: '', redirectTo: 'pending/1', pathMatch: 'full' },
          {
            path: 'pending',
            data: { status: 0 },
            children: [
              { path: '', redirectTo: '1', pathMatch: 'full' },
              { path: ':page', component: TicketListComponent }
            ]
          },
          {
            path: 'resolved',
            data: { status: 1 },
            children: [
              { path: '', redirectTo: '1', pathMatch: 'full' },
              { path: ':page', component: TicketListComponent }
            ]
          }
        ]
      },
      { path: 'notify', component: SendNotificationComponent }
    ]
  },
  { path: 'login', component: LoginComponent, data: { superAdmin: true } }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule { }
