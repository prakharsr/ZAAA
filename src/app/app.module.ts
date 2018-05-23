import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseModule } from './base.module';
import { AdminModule } from '@aaman/main/admin.module';
import { DirectoryModule } from './directory/directory.module';
import { CoUsersModule } from './co-users/co-users.module';
import { RateCardModule } from '@aaman/ratecard/rate-card.module';
import { ReleaseOrderModule } from '@aaman/releaseorder/release-order.module';
import { InvoiceModule } from '@aaman/invoice/invoice.module';
import { ReceiptsModule } from '@aaman/receipts/receipts.module';
import { AccountsModule } from '@aaman/accounts/accounts.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from '@aaman/main/home/home.component';
import { PhoneVerifyComponent } from '@aaman/main/phone-verify/phone-verify.component';
import { NavbarComponent } from '@aaman/main/navbar/navbar.component';
import { LoginComponent } from '@aaman/main/login/login.component';
import { RegisterComponent } from '@aaman/main/register/register.component';
import { ProfileViewComponent } from '@aaman/main/profile-view/profile-view.component';
import { DashboardComponent } from '@aaman/main/dashboard/dashboard.component';
import { FirmProfileViewComponent } from '@aaman/main/firm-profile-view/firm-profile-view.component';
import { ChangePswComponent } from '@aaman/main/change-psw/change-psw.component';
import { ForgotPswComponent } from '@aaman/main/forgot-psw/forgot-psw.component';
import { NotFoundComponent } from '@aaman/main/not-found/not-found.component';
import { ResetPasswordComponent } from '@aaman/main/reset-password/reset-password.component';
import { LoaderComponent } from '@aaman/main/loader/loader.component';

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
    FirmProfileViewComponent,
    ChangePswComponent,
    ForgotPswComponent,
    NotFoundComponent,
    ResetPasswordComponent,
    LoaderComponent
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
