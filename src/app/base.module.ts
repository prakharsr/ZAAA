import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, Validator }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

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

import { MailingDetailsComponent } from './components/mailing-details/mailing-details.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { LoaderService } from './services/loader.service';
import { NotificationService } from './services/notification.service';

import { VerifyEmailDirective } from './validators/verify-email.directive';
import { VerifyMinDirective } from './validators/verify-min.directive';
import { VerifyMaxDirective } from './validators/verify-max.directive';
import { VerifyLengthDirective } from './validators/verify-fix-length.directive';
import { VerifyMultipleOfDirective } from './validators/verify-multiple-of.directive';

const validators = [
  VerifyEmailDirective,
  VerifyMinDirective,
  VerifyMaxDirective,
  VerifyLengthDirective,
  VerifyMultipleOfDirective
];

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MaterialModule
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
    LoaderService,
    NotificationService
  ],
  declarations: [
    MailingDetailsComponent,
    DialogComponent,
    validators
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MailingDetailsComponent,
    validators
  ],
  entryComponents: [
    DialogComponent,
    MailingDetailsComponent
  ]
})
export class BaseModule { }
