import { NgModule } from '@angular/core';
import { BaseModule } from './base.module';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './/app-routing.module';
import { DirectoryModule } from './directory/directory.module';
import { CoUsersModule } from './co-users/co-users.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirmProfileViewComponent } from './components/firm-profile-view/firm-profile-view.component';
import { ChangePswComponent } from './components/change-psw/change-psw.component';
import { ForgotPswComponent } from './components/forgot-psw/forgot-psw.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateRateCardComponent } from './components/create-rate-card/create-rate-card.component';

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
    CreateRateCardComponent
  ],
  imports: [
    BaseModule,
    AdminModule,
    DirectoryModule,
    CoUsersModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
