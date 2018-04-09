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
import { StateApiService } from './services/state-api.service';

import { AuthGuard } from './guards/auth-guard.service';
import { PhoneVerifyGuard } from './guards/phone-verify-guard.service';
import { AdminGuard } from './guards/admin-guard.service';
import { PlanGuard } from './guards/plan-guard.service';
import { CanDeactiveGuard } from './guards/can-deactive-guard.service';
import { MailingDetailsComponent } from './components/mailing-details/mailing-details.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    WindowService,
    RazorPayService,
    IfscService,
    DialogService,
    StateApiService,
    AuthGuard,
    PhoneVerifyGuard,
    AdminGuard,
    PlanGuard,
    CanDeactiveGuard
  ],
  declarations: [
    MailingDetailsComponent
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MailingDetailsComponent
  ]
})
export class BaseModule { }
