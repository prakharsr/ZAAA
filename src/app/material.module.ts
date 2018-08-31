import { NgModule } from '@angular/core';

import * as mat from '@angular/material';

const modules = [
  mat.MatCheckboxModule,
  mat.MatFormFieldModule,
  mat.MatInputModule,
  mat.MatExpansionModule,
  mat.MatDatepickerModule,
  mat.MatNativeDateModule,
  mat.MatProgressBarModule,
  mat.MatTabsModule,
  mat.MatSnackBarModule,
  mat.MatToolbarModule,
  mat.MatDialogModule,
  mat.MatButtonModule,
  mat.MatSlideToggleModule,
  mat.MatIconModule,
  mat.MatMenuModule,
  mat.MatSelectModule,
  mat.MatTableModule,
  mat.MatCardModule,
  mat.MatSidenavModule,
  mat.MatButtonModule,
  mat.MatTooltipModule
]

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule { }
