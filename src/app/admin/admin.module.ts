import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import {
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
    PlanSelectorComponent,
    TemplateSelectorItemComponent,
    TemplateSelectorComponent,
    ProfileEditComponent
  ]
})
export class AdminModule { }
