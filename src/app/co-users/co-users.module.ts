import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  CoUserComponent,
  CoUsersComponent,
  RoleControlComponent,
  RoleEditComponent,
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
  ]
})
export class CoUsersModule { }
