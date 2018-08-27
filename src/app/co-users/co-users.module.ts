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

@NgModule({
  imports: [
    BaseModule
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
