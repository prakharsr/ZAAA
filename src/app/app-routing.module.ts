import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile/edit", component: ProfileEditComponent, canActivate: [AuthGuardService] },
  { path: "profile", component: ProfileViewComponent, canActivate: [AuthGuardService] },
  { path: "firm", component: FirmProfileViewComponent, canActivate: [AuthGuardService] },
  { path: "firm/edit", component: FirmProfileEditComponent, canActivate: [AuthGuardService] },
  { path: 'coUsers', component: CoUsersComponent, canActivate: [AuthGuardService] },
  { path: 'templates', component: TemplateSelectorComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
