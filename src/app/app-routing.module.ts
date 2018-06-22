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
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  ForgotPswComponent,
  PhoneVerifyComponent,
  ProfileViewComponent,
  FirmProfileViewComponent,
  DashboardComponent,
  ChangePswComponent,
  ResetPasswordComponent,
  NotFoundComponent
} from './components';

import {
  ProfileEditComponent,
  FirmProfileEditComponent,
  TemplateSelectorComponent,
  PlanSelectorComponent
} from 'app/admin';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'superadmin',
    loadChildren: 'app/super-admin/super-admin.module#SuperAdminModule'
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
    component: FirmProfileViewComponent,
    canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      firm: FirmResolver,
      user: UserProfileResolver
    }
  },
  {
    path: "firm/edit",
    component: FirmProfileEditComponent,
    canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard],
    resolve: {
      firm: FirmResolver,
      user: UserProfileResolver
    }
  },
  { path: 'templates', component: TemplateSelectorComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard] },
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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
