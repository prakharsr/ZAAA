import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminApiService } from './super-admin-api.service';
import { SuperAdminGuard } from './super-admin-guard.service';

@NgModule({
  imports: [
    BaseModule,
    SuperAdminRoutingModule
  ],
  declarations: [AdCategoriesComponent],
  providers: [
    SuperAdminApiService,
    SuperAdminGuard
  ]
})
export class SuperAdminModule { }
