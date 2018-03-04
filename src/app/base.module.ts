import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './services/api.service';
import { RazorPayService } from './services/razorpay.service';
import { WindowService } from './services/window.service';
import { IfscService } from './services/ifsc.service';
import { DialogService } from './services/dialog.service';

import { AuthGuard } from './guards/auth-guard.service';
import { PhoneVerifyGuard } from './guards/phone-verify-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { PlanGuard } from './guards/plan-guard.service';
import { CanDeactiveGuard } from './guards/can-deactive-guard.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    WindowService,
    RazorPayService,
    IfscService,
    DialogService,
    AuthGuard,
    PhoneVerifyGuard,
    AdminGuard,
    PlanGuard,
    CanDeactiveGuard
  ],
  declarations: [],
  exports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ]
})
export class BaseModule { }
