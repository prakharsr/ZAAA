import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  CoUserComponent,
  CoUsersComponent,
  RoleControlComponent,
  RoleEditComponent,
  CoUserApiService,
  CoUsersResolver
} from '.';
import { CoUsersRoutingModule } from './co-users-routing.module';

@NgModule({
  imports: [
    BaseModule,
    CoUsersRoutingModule
  ],
  declarations: [
    CoUsersComponent,
    CoUserComponent,
    RoleControlComponent,
    RoleEditComponent
  ],
  providers: [
    CoUserApiService,
    CoUsersResolver
  ]
})
export class CoUsersModule { }
