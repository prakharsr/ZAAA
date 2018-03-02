import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './services/api.service';
import { RazorPayService } from './services/razorpay.service';
import { WindowService } from './services/window.service';
import { IfscService } from './services/ifsc.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PhoneVerifyGuardService } from './services/phone-verify-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { PlanGuardService } from './services/plan-guard.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PlanSelectorComponent } from './components/plan-selector/plan-selector.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { LoginComponent } from './components/login/login.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { TemplateSelectorItemComponent } from './components/template-selector-item/template-selector-item.component';
import { CoUsersComponent } from './components/co-users/co-users.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { NewCoUserComponent } from './components/new-co-user/new-co-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FirmProfileViewComponent } from './components/firm-profile-view/firm-profile-view.component';
import { FirmProfileEditComponent } from './components/firm-profile-edit/firm-profile-edit.component';
import { ChangePswComponent } from './components/change-psw/change-psw.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanSelectorComponent,
    PhoneVerifyComponent,
    LoginComponent,
    TemplateSelectorComponent,
    RegisterComponent,
    ProfileEditComponent,
    TemplateSelectorItemComponent,
    NewCoUserComponent,
    CoUsersComponent,
    ProfileViewComponent,
    DashboardComponent,
    FirmProfileViewComponent,
    FirmProfileEditComponent,
    ChangePswComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    WindowService,
    RazorPayService,
    IfscService,
    AuthGuardService,
    PhoneVerifyGuardService,
    AdminGuardService,
    PlanGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
