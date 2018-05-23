import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, PhoneVerifyGuard, PlanGuard } from 'app/guards';

import { UserProfileResolver } from '@aaman/main/user-profile-resolver.service';

import {
  CoUsersResolver,
  CoUserComponent,
  CoUsersComponent,
  RoleEditComponent  
} from '.';

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
