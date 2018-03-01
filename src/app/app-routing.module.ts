import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { CoUsersComponent } from './components/co-users/co-users.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profileEdit", component: ProfileEditComponent },
  { path: "profileView", component: ProfileViewComponent },
  { path: 'coUsers', component: CoUsersComponent },
  { path: 'templates', component: TemplateSelectorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
