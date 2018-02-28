import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { CoUsersComponent } from './components/co-users/co-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profileEdit", component: ProfileEditComponent },
  { path: 'coUsers', component: CoUsersComponent } 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
