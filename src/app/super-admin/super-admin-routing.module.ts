import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdCategoriesComponent } from './ad-categories/ad-categories.component';
import { SuperAdminGuard } from './super-admin-guard.service';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminLoginComponent } from './super-admin-login/super-admin-login.component';
import { MediaHouseListComponent, MediaHouseListResolver } from 'app/directory';

const routes: Routes = [
  {
    path: '',
    data: { superAdmin: true },
    canActivate: [SuperAdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SuperAdminDashboardComponent },
      { path: 'categories', component: AdCategoriesComponent },
      {
        path: 'media_houses',
        data: { global: true },
        children: [
          { path: '', redirectTo: 'list/1', pathMatch: 'full' },
          {
            path: 'list/:page',
            component: MediaHouseListComponent,
            resolve: {
              list: MediaHouseListResolver
            }
          }
        ]
      }
    ]
  },
  { path: 'login', component: SuperAdminLoginComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SuperAdminRoutingModule { }
