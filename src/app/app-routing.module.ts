import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth-guard.service';
import { PhoneVerifyGuard } from './guards/phone-verify-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { PlanGuard } from './guards/plan-guard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { CoUsersComponent } from './components/co-users/co-users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirmProfileViewComponent } from './components/firm-profile-view/firm-profile-view.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { ChangePswComponent } from './components/change-psw/change-psw.component';
import { ForgotPswComponent } from './components/forgot-psw/forgot-psw.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CanDeactiveGuard } from './guards/can-deactive-guard.service';

import { FirmProfileEditComponent } from './admin/firm-profile-edit/firm-profile-edit.component';
import { NewCoUserComponent } from './admin/new-co-user/new-co-user.component';
import { ProfileEditComponent } from './admin/profile-edit/profile-edit.component';
import { TemplateSelectorComponent } from './admin/template-selector/template-selector.component';
import { PlanSelectorComponent } from './admin/plan-selector/plan-selector.component';
import { RoleEditComponent } from './admin/role-edit/role-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPswComponent },
  { path: "verify/mobile", component: PhoneVerifyComponent, canActivate: [AuthGuard] },
  { path: "profile/edit", component: ProfileEditComponent, canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard], canDeactivate: [CanDeactiveGuard] },
  { path: "profile", component: ProfileViewComponent, canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard] },
  { path: "firm", component: FirmProfileViewComponent, canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard] },
  { path: "firm/edit", component: FirmProfileEditComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard], canDeactivate: [CanDeactiveGuard] },
  { path: 'coUsers', component: CoUsersComponent, canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard] },
  { path: 'coUsers/new', component: NewCoUserComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard], canDeactivate: [CanDeactiveGuard] },
  { path: 'coUsers/:id', component: RoleEditComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard] },
  { path: 'templates', component: TemplateSelectorComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard] },
  { path: 'plan', component: PlanSelectorComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'changePassword', component: ChangePswComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
