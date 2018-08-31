import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { Guard } from 'app/guards';

import { FirmResolver, UserProfileResolver } from 'app/services';

import {
  LoginComponent,
  RegisterComponent,
  ForgotPswComponent,
  PhoneVerifyComponent,
  ProfileViewComponent,
  AccountDetailsComponent,
  BusinessDetailsComponent,
  DashboardComponent,
  ChangePswComponent,
  ResetPasswordComponent,
  NotFoundComponent
} from './components';

import {
  ProfileEditComponent,
  PlanSelectorComponent
} from 'app/admin';

import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { TncComponent } from './components/tnc/tnc.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: '',
    canActivateChild: [Guard],
    children: [
      {
        path: 'superadmin',
        loadChildren: 'app/super-admin/super-admin.module#SuperAdminModule'
      },
      {
        path: 'accounts',
        loadChildren: 'app/accounts/accounts.module#AccountsModule'
      },
      {
        path: 'coUsers',
        loadChildren: 'app/co-users/co-users.module#CoUsersModule'
      },
      {
        path: 'dir',
        loadChildren: 'app/directory/directory.module#DirectoryModule'
      },
      {
        path: 'ratecards',
        loadChildren: 'app/rate-card/rate-card.module#RateCardModule'
      },
      {
        path: 'releaseorders',
        loadChildren: 'app/release-order/release-order.module#ReleaseOrderModule'
      },
      {
        path: 'invoices',
        loadChildren: 'app/invoice/invoice.module#InvoiceModule'
      },
      {
        path: 'receipts',
        loadChildren: 'app/receipts/receipts.module#ReceiptsModule'
      },
      {
        path: "verify/mobile",
        component: PhoneVerifyComponent,
        data: { verifyMobile: true }
      },
      {
        path: 'plan',
        component: PlanSelectorComponent,
        data: { plan: true }
      },
      { path: 'forgotPassword', component: ForgotPswComponent },
      {
        path: "profile",
        component: ProfileViewComponent,
        resolve: {
          user: UserProfileResolver
        }
      },
      {
        path: "profile/edit",
        component: ProfileEditComponent,
        data: { admin: true },
        resolve: {
          user: UserProfileResolver
        }
      },
      {
        path: "firm",
        component: BusinessDetailsComponent,
        resolve: {
          firm: FirmResolver,
          user: UserProfileResolver
        }
      },
      {
        path: "account",
        component: AccountDetailsComponent,
        resolve: {
          user: UserProfileResolver
        }
      },
      {
        path: 'tnc',
        component: TncComponent,
        data: { admin: true },
        resolve: {
          firm: FirmResolver
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
          user: UserProfileResolver
        }
      },
      { path: 'changePassword', component: ChangePswComponent },
    ]
  },
  { path: 'reset_password/:token', component: ResetPasswordComponent },
  {
    path: 'tickets',
    children: [
      { path: '', redirectTo: 'list/1', pathMatch: 'full' },
      {
        path: 'list/:page',
        component: TicketListComponent
      },
      {
        path: 'new',
        component: CreateTicketComponent
      }
    ]
  },
  { path: 'testimonial', component: TestimonialComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
