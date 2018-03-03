import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { PhoneVerifyGuardService } from './services/phone-verify-guard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { CoUsersComponent } from './components/co-users/co-users.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirmProfileViewComponent } from './components/firm-profile-view/firm-profile-view.component';
import { FirmProfileEditComponent } from './components/firm-profile-edit/firm-profile-edit.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { AdminGuardService } from './services/admin-guard.service';
import { PlanSelectorComponent } from './components/plan-selector/plan-selector.component';
import { PlanGuardService } from './services/plan-guard.service';
import { ChangePswComponent } from './components/change-psw/change-psw.component';
import { ForgotPswComponent } from './components/forgot-psw/forgot-psw.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewCoUserComponent } from './components/new-co-user/new-co-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: 'forgotPassword', component: ForgotPswComponent },
  { path: "verify/mobile", component: PhoneVerifyComponent, canActivate: [AuthGuardService] },
  { path: "profile/edit", component: ProfileEditComponent, canActivate: [AdminGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: "profile", component: ProfileViewComponent, canActivate: [AuthGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: "firm", component: FirmProfileViewComponent, canActivate: [AuthGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: "firm/edit", component: FirmProfileEditComponent, canActivate: [AdminGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: 'coUsers', component: CoUsersComponent, canActivate: [AuthGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: 'coUsers/new', component: NewCoUserComponent, canActivate: [AdminGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: 'templates', component: TemplateSelectorComponent, canActivate: [AdminGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService, PhoneVerifyGuardService, PlanGuardService] },
  { path: 'plan', component: PlanSelectorComponent, canActivate: [AuthGuardService, AdminGuardService] },
  { path: 'changePassword', component: ChangePswComponent, canActivate: [AuthGuardService] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
