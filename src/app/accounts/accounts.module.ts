import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { AccountsRoutingModule } from '@aaman/accounts/accounts-routing.module';

@NgModule({
  imports: [
    BaseModule,
    AccountsRoutingModule
  ],
  declarations: []
})
export class AccountsModule { }
