import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const modules = [
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }
