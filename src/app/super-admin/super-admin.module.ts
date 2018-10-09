import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { SuperAdminImportExportComponent } from './super-admin-import-export/super-admin-import-export.component';

import {
  MediaHouseListComponent,
  MediaHouseComponent
} from 'app/directory';

import {
  RateCardListComponent,
  RateCardComponent,
  RateCardDetailsComponent
} from 'app/rate-card';

// Import components instead of modules or routing will suffer
const superComponents = [  
  MediaHouseComponent,
  MediaHouseListComponent,
  RateCardListComponent,
  RateCardComponent,
  RateCardDetailsComponent
]

@NgModule({
  imports: [
    BaseModule,
    SuperAdminRoutingModule
  ],
  declarations: [
    superComponents,
    AdCategoriesComponent,
    SuperAdminDashboardComponent,
    CreateAdminComponent,
    AdminListComponent,
    SendNotificationComponent,
    SuperAdminImportExportComponent
  ]
})
export class SuperAdminModule { }
