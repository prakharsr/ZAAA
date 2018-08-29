import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsApiService } from './reports-api.service';
import { ImportExportComponent } from './import-export/import-export.component';
import { ImportExportApiService } from './import-export-api.service';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [
    BaseModule,
    ReportsRoutingModule
  ],
  declarations: [
    ReportsHomeComponent,
    ImportExportComponent
  ],
  providers: [
    ReportsApiService,
    ImportExportApiService
  ]
})
export class ReportsModule { }
