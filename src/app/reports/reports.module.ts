import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsApiService } from './reports-api.service';

@NgModule({
  imports: [
    BaseModule,
    ReportsRoutingModule
  ],
  declarations: [ReportsHomeComponent],
  providers: [ReportsApiService]
})
export class ReportsModule { }
