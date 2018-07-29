import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminGuard } from './super-admin-guard.service';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { RateCardModule } from '../rate-card/rate-card.module';
import { DirectoryModule } from '../directory/directory.module';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
    RateCardModule,
    SuperAdminRoutingModule
  ],
  declarations: [
    AdCategoriesComponent,
    SuperAdminDashboardComponent,
    CreateAdminComponent
  ],
  providers: [
    SuperAdminGuard
  ]
})
export class SuperAdminModule { }
