import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@aaman/main/auth-guard.service';
import { AdminGuard } from '@aaman/main/admin-guard.service';
import { PhoneVerifyGuard } from '@aaman/main/phone-verify-guard.service';
import { PlanGuard } from '@aaman/main/plan-guard.service';
import { FirmResolver } from '@aaman/main/firm-resolver.service';
import { UserProfileResolver } from '@aaman/main/user-profile-resolver.service';

import { HomeComponent } from '@aaman/main/home/home.component';
import { LoginComponent } from '@aaman/main/login/login.component';
import { RegisterComponent } from '@aaman/main/register/register.component';
import { ForgotPswComponent } from '@aaman/main/forgot-psw/forgot-psw.component';
import { PhoneVerifyComponent } from '@aaman/main/phone-verify/phone-verify.component';
import { ProfileViewComponent } from '@aaman/main/profile-view/profile-view.component';
import { ProfileEditComponent } from '@aaman/main/profile-edit/profile-edit.component';
import { FirmProfileViewComponent } from '@aaman/main/firm-profile-view/firm-profile-view.component';
import { FirmProfileEditComponent } from '@aaman/main/firm-profile-edit/firm-profile-edit.component';
import { TemplateSelectorComponent } from '@aaman/main/template-selector/template-selector.component';
import { DashboardComponent } from '@aaman/main/dashboard/dashboard.component';
import { PlanSelectorComponent } from '@aaman/main/plan-selector/plan-selector.component';
import { ChangePswComponent } from '@aaman/main/change-psw/change-psw.component';
import { ResetPasswordComponent } from '@aaman/main/reset-password/reset-password.component';
import { NotFoundComponent } from '@aaman/main/not-found/not-found.component';

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
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
