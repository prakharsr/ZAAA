import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { FormControlService } from './form-control.service';

import { DynamicFieldComponent } from './dynamic-field/dynamic-field.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    DynamicFieldComponent,
    DynamicFormComponent
  ],
  providers: [FormControlService],
  exports: [DynamicFormComponent]
})
export class DynamicFormsModule { }
