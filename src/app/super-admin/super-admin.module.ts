import { NgModule } from '@angular/core';
import { BaseModule } from '../base.module';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';

@NgModule({
  imports: [
    BaseModule,
    SuperAdminRoutingModule
  ],
  declarations: [AdCategoriesComponent]
})
export class SuperAdminModule { }
