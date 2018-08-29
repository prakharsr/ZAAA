import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseModule } from './base.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {
  HomeComponent,
  RegisterComponent,
  ForgotPswComponent,
  PhoneVerifyComponent,
  ProfileViewComponent,
  AccountDetailsComponent,
  BusinessDetailsComponent,
  DashboardComponent,
  ChangePswComponent,
  ResetPasswordComponent,
  NotFoundComponent,
  NavbarComponent,
  LoaderComponent
} from './components';

import { ReportsModule } from './reports/reports.module';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { DashboardApiService } from './services/dashboard-api.service';
import { TncComponent } from './components/tnc/tnc.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PhoneVerifyComponent,
    RegisterComponent,
    ProfileViewComponent,
    DashboardComponent,
    AccountDetailsComponent,
    BusinessDetailsComponent,
    ChangePswComponent,
    ForgotPswComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    LoaderComponent,
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
