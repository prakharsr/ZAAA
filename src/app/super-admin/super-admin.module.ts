import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { SuperAdminImportExportComponent } from './super-admin-import-export/super-admin-import-export.component';

import { RcCommonModule } from '../rc-common.module';
import { MhCommonModule } from '../mh-common.module';
import { FirmListComponent } from './firm-list/firm-list.component';
import { SuperFirmViewComponent } from './super-firm-view/super-firm-view.component';

@NgModule({
  imports: [
    BaseModule,
    RcCommonModule,
    MhCommonModule,
    SuperAdminRoutingModule
  ],
  declarations: [
    AdCategoriesComponent,
    SuperAdminDashboardComponent,
    CreateAdminComponent,
    AdminListComponent,
    SendNotificationComponent,
    SuperAdminImportExportComponent,
    FirmListComponent,
    SuperFirmViewComponent
  ]
})
export class SuperAdminModule { }
