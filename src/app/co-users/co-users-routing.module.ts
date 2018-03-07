import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';
import { PhoneVerifyGuard } from '../guards/phone-verify-guard.service';
import { PlanGuard } from '../guards/plan-guard.service';
import { AdminGuard } from '../guards/admin-guard.service';
import { CanDeactiveGuard } from '../guards/can-deactive-guard.service';

import { CoUsersComponent } from './co-users/co-users.component';
import { NewCoUserComponent } from './new-co-user/new-co-user.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

const routes: Routes = [
  { path: 'coUsers', component: CoUsersComponent, canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard] },
  { path: 'coUsers/new', component: NewCoUserComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard], canDeactivate: [CanDeactiveGuard] },
  { path: 'coUsers/:id', component: RoleEditComponent, canActivate: [AdminGuard, PhoneVerifyGuard, PlanGuard] },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CoUsersRoutingModule { }
