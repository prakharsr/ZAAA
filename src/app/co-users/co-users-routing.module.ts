import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@aaman/main/auth-guard.service';
import { PhoneVerifyGuard } from '@aaman/main/phone-verify-guard.service';
import { PlanGuard } from '@aaman/main/plan-guard.service';

import { CoUsersResolver } from '@aaman/couser/co-user-resolver.service';
import { UserProfileResolver } from '@aaman/main/user-profile-resolver.service';

import { CoUsersComponent } from '@aaman/couser/co-users/co-users.component';
import { CoUserComponent } from '@aaman/couser/co-user/co-user.component';
import { RoleEditComponent } from '@aaman/couser/role-edit/role-edit.component';

const routes: Routes = [
  {
    path: 'coUsers',
    canActivate: [
      AuthGuard,
      PhoneVerifyGuard,
      PlanGuard
    ],
    children: [
      {
        path: '',
        component: CoUsersComponent,
        resolve: {
          coUsers: CoUsersResolver,
          user: UserProfileResolver
        }
      },
      {
        path: 'new',
        component: CoUserComponent
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
