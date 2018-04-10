import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    MatCheckboxModule
  ],
  declarations: []
})
export class MaterialModule { }
