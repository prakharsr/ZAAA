import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { CoUsersRoutingModule } from './co-users-routing.module';

import { CoUsersComponent } from './co-users/co-users.component';
import { CoUserComponent } from './co-user/co-user.component';
import { RoleControlComponent } from './role-control/role-control.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { CoUserApiService } from './co-user-api.service';

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
  providers: [CoUserApiService]
})
export class CoUsersModule { }
