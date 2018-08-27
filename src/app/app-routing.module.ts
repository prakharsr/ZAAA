import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  AdminGuard,
  PhoneVerifyGuard,
  PlanGuard
} from 'app/guards';

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
import { DirRoutingModule } from './directory/dir-routing.module';
import { RateCardRoutingModule } from './rate-card/rate-card-routing.module';
import { CoUsersRoutingModule } from './co-users/co-users-routing.module';
import { ReleaseOrderRoutingModule } from './release-order/release-order-routing.module';
import { InvoiceRoutingModule } from './invoice/invoice-routing.module';
import { ReceiptsRoutingModule } from './receipts/receipts-routing.module';
import { ReportsRoutingModule } from './reports/reports-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'superadmin',
    loadChildren: 'app/super-admin/super-admin.module#SuperAdminModule'
  },
  {
    path: 'accounts',
    loadChildren: 'app/accounts/accounts.module#AccountsModule'
  },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPswComponent },
  { path: "verify/mobile", component: PhoneVerifyComponent, canActivate: [AuthGuard] },
  {
    path: "profile",
    component: ProfileViewComponent,
    canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      user: UserProfileResolver
    }
  },
  {
    path: "profile/edit",
    component: ProfileEditComponent,
    canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      user: UserProfileResolver
    }
  },
  {
    path: "firm",
    component: BusinessDetailsComponent,
    canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      firm: FirmResolver,
      user: UserProfileResolver
    }
  },
  {
    path: "account",
    component: AccountDetailsComponent,
    canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      user: UserProfileResolver
    }
  },
  {
    path: 'tnc',
    component: TncComponent,
    canActivate: [AdminGuard],
    resolve: {
      firm: FirmResolver
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      user: UserProfileResolver
    }
  },
  { path: 'plan', component: PlanSelectorComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'changePassword', component: ChangePswComponent, canActivate: [AuthGuard] },
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
    DirRoutingModule,
    CoUsersRoutingModule,
    RateCardRoutingModule,
    ReleaseOrderRoutingModule,
    InvoiceRoutingModule,
    ReceiptsRoutingModule,
    ReportsRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
