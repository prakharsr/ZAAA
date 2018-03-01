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

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PlanSelectorComponent } from './components/plan-selector/plan-selector.component';
import { PhoneVerifyComponent } from './components/phone-verify/phone-verify.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { TemplateSelectorItemComponent } from './components/template-selector-item/template-selector-item.component';
import { CoUsersComponent } from './components/co-users/co-users.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { NewCoUserComponent } from './components/new-co-user/new-co-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PlanSelectorComponent,
    PhoneVerifyComponent,
    LoginComponent,
    SignupComponent,
    TemplateSelectorComponent,
    RegisterComponent,
    ProfileEditComponent,
    TemplateSelectorItemComponent,
    NewCoUserComponent,
    CoUsersComponent,
    ProfileViewComponent,
    DashboardComponent   
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
    IfscService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
