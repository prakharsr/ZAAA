import { NgModule } from '@angular/core';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule, MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material';

const modules = [
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatTabsModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatCardModule,
  MatSidenavModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }
