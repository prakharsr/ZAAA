import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';
import { PhoneVerifyGuard } from '../guards/phone-verify-guard.service';
import { PlanGuard } from '../guards/plan-guard.service';
import { AdminGuard } from '../guards/admin-guard.service';

import { CoUsersComponent } from './co-users/co-users.component';
import { NewCoUserComponent } from './new-co-user/new-co-user.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

const routes: Routes = [
  {
    path: 'coUsers',
    canActivate: [AuthGuard, PhoneVerifyGuard, PlanGuard],
    children: [
      {
        path: '',
        component: CoUsersComponent
      },
      {
        path: 'new',
        component: NewCoUserComponent
      },
      {
        path: ':id',
        component: RoleEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CoUsersRoutingModule { }
