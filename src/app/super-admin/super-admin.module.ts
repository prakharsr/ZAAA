import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminGuard } from './super-admin-guard.service';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { DirectoryModule } from 'app/directory/directory.module';
import { CreateAdminComponent } from './create-admin/create-admin.component';

@NgModule({
  imports: [
    BaseModule,
    DirectoryModule,
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
