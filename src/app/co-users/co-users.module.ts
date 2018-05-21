import { NgModule } from '@angular/core';

import { BaseModule } from '../base.module';

import { CoUsersRoutingModule } from '@aaman/couser/co-users-routing.module';
import { CoUsersComponent } from '@aaman/couser/co-users/co-users.component';
import { CoUserComponent } from '@aaman/couser/co-user/co-user.component';
import { RoleControlComponent } from '@aaman/couser/role-control/role-control.component';
import { RoleEditComponent } from '@aaman/couser/role-edit/role-edit.component';

import { CoUserApiService } from '@aaman/couser/co-user-api.service';
import { CoUsersResolver } from '@aaman/couser/co-user-resolver.service';

@NgModule({
  imports: [
    BaseModule,
    CoUsersRoutingModule,
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
