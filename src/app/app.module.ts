import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseModule } from './base.module';
import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';
import { ReportsModule } from './reports/reports.module';

import { AppComponent } from './app.component';

import * as comp from './components';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { DashboardApiService } from './services/dashboard-api.service';
import { TncComponent } from './components/tnc/tnc.component';

@NgModule({
  declarations: [
    AppComponent,
    comp.NavbarComponent,
    comp.HomeComponent,
    comp.PhoneVerifyComponent,
    comp.RegisterComponent,
    comp.ProfileViewComponent,
    comp.DashboardComponent,
    comp.AccountDetailsComponent,
    comp.BusinessDetailsComponent,
    comp.ChangePswComponent,
    comp.ForgotPswComponent,
    comp.NotFoundComponent,
    comp.ResetPasswordComponent,
    comp.LoaderComponent,
    CreateTicketComponent,
    TncComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BaseModule,
    AdminModule,
    ReportsModule,
    AppRoutingModule
  ],
  providers: [
    DashboardApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
