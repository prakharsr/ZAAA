import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard.service';
import { PhoneVerifyGuard } from './guards/phone-verify-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { PlanGuard } from './guards/plan-guard.service';

import { FirmResolver } from './services/firm-resolver.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirmProfileViewComponent } from './components/firm-profile-view/firm-profile-view.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { ChangePswComponent } from './components/change-psw/change-psw.component';
import { ForgotPswComponent } from './components/forgot-psw/forgot-psw.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FirmProfileEditComponent } from './admin/firm-profile-edit/firm-profile-edit.component';
import { TemplateSelectorComponent } from './admin/template-selector/template-selector.component';
import { PlanSelectorComponent } from './admin/plan-selector/plan-selector.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserProfileResolver } from './services/user-profile-resolver.service';

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
      firm: FirmResolver
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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
