import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { FirmProfileEditComponent } from '@aaman/main/firm-profile-edit/firm-profile-edit.component';
import { PlanSelectorComponent } from '@aaman/main/plan-selector/plan-selector.component';
import { TemplateSelectorItemComponent } from '@aaman/main/template-selector-item/template-selector-item.component';
import { TemplateSelectorComponent } from '@aaman/main/template-selector/template-selector.component';
import { ProfileEditComponent } from '@aaman/main/profile-edit/profile-edit.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    FirmProfileEditComponent,
    PlanSelectorComponent,
    TemplateSelectorItemComponent,
    TemplateSelectorComponent,
    ProfileEditComponent
  ]
})
export class AdminModule { }
