import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlanSelectorComponent } from './components/plan-selector/plan-selector.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plan', component: PlanSelectorComponent },
  { path: 'otp', component: PhoneVerifyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'templates', component: TemplateSelectorComponent },
  { path: "register", component: RegisterComponent },
  { path: "profileEdit", component: ProfileEditComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
