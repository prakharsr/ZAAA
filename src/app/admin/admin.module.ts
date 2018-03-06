import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { FirmProfileEditComponent } from './firm-profile-edit/firm-profile-edit.component';
import { NewCoUserComponent } from './new-co-user/new-co-user.component';
import { PlanSelectorComponent } from './plan-selector/plan-selector.component';
import { RoleControlComponent } from './role-control/role-control.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { TemplateSelectorItemComponent } from './template-selector-item/template-selector-item.component';
import { TemplateSelectorComponent } from './template-selector/template-selector.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    FirmProfileEditComponent,
    NewCoUserComponent,
    PlanSelectorComponent,
    RoleControlComponent,
    RoleEditComponent,
    TemplateSelectorItemComponent,
    TemplateSelectorComponent
  ]
})
export class AdminModule { }
