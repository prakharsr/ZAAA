import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileResolver } from 'app/services';

import {
  CoUsersResolver,
  CoUserComponent,
  CoUsersComponent,
  RoleEditComponent  
} from '.';

const routes: Routes = [
  {
    path: '',
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
