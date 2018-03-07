import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';

import { FirmProfileEditComponent } from './firm-profile-edit/firm-profile-edit.component';
import { PlanSelectorComponent } from './plan-selector/plan-selector.component';
import { TemplateSelectorItemComponent } from './template-selector-item/template-selector-item.component';
import { TemplateSelectorComponent } from './template-selector/template-selector.component';

@NgModule({
  imports: [
    BaseModule
  ],
  declarations: [
    FirmProfileEditComponent,
    PlanSelectorComponent,
    TemplateSelectorItemComponent,
    TemplateSelectorComponent
  ]
})
export class AdminModule { }
