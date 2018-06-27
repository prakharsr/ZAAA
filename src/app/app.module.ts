import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseModule } from './base.module';
import { AdminModule } from './admin/admin.module';
import { DirectoryModule } from './directory/directory.module';
import { CoUsersModule } from './co-users/co-users.module';
import { RateCardModule } from './rate-card/rate-card.module';
import { ReleaseOrderModule } from './release-order/release-order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { AccountsModule } from './accounts/accounts.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  ForgotPswComponent,
  PhoneVerifyComponent,
  ProfileViewComponent,
  AccountDetailsComponent,
  BusinessDetailsComponent,
  UserDetailsComponent,
  DashboardComponent,
  ChangePswComponent,
  ResetPasswordComponent,
  NotFoundComponent,
  NavbarComponent,
  LoaderComponent
} from './components';

import { ReportsModule } from './reports/reports.module';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PhoneVerifyComponent,
    LoginComponent,
    RegisterComponent,
    ProfileViewComponent,
    DashboardComponent,
    AccountDetailsComponent,
    BusinessDetailsComponent,
    UserDetailsComponent,
    ChangePswComponent,
    ForgotPswComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    LoaderComponent,
    TicketListComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BaseModule,
    AdminModule,
    DirectoryModule,
    CoUsersModule,
    RateCardModule,
    ReleaseOrderModule,
    InvoiceModule,
    ReceiptsModule,
    AccountsModule,
    ReportsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
