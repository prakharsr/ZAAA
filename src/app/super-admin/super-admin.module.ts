import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from '@aaman/superadmin/super-admin-routing.module';
import { AdCategoriesComponent } from '@aaman/superadmin/ad-categories/ad-categories.component';

@NgModule({
  imports: [
    BaseModule,
    SuperAdminRoutingModule
  ],
  declarations: [AdCategoriesComponent]
})
export class SuperAdminModule { }
