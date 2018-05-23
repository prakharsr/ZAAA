import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
  FirmProfileEditComponent,
  PlanSelectorComponent,
  TemplateSelectorItemComponent,
  TemplateSelectorComponent,
  ProfileEditComponent
} from '.';

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
