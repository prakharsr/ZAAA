import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, Validator }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { ApiService } from '@aaman/main/api.service';
import { WindowService } from '@aaman/main/window.service';
import { RazorPayService } from '@aaman/main/razorpay.service';
import { IfscService } from '@aaman/main/ifsc.service';
import { DialogService } from '@aaman/main/dialog.service';
import { StateApiService } from '@aaman/main/state-api.service';
import { LoaderService } from '@aaman/main/loader.service';
import { NotificationService } from '@aaman/main/notification.service';
import { OptionsService } from '@aaman/main/options.service';

import { FirmResolver } from '@aaman/main/firm-resolver.service';
import { UserProfileResolver } from '@aaman/main/user-profile-resolver.service';

import { AuthGuard } from '@aaman/main/auth-guard.service';
import { PhoneVerifyGuard } from '@aaman/main/phone-verify-guard.service';
import { AdminGuard } from '@aaman/main/admin-guard.service';
import { PlanGuard } from '@aaman/main/plan-guard.service';

import { MailingDetailsComponent } from '@aaman/main/mailing-details/mailing-details.component';
import { DialogComponent } from '@aaman/main/dialog/dialog.component';
import { BillingDetailsComponent } from '@aaman/main/billing-details/billing-details.component';
import { PaginationComponent } from '@aaman/main/pagination/pagination.component';

import { VerifyEmailDirective } from '@aaman/main/verify-email.directive';
import { VerifyMinDirective } from '@aaman/main/verify-min.directive';
import { VerifyMaxDirective } from '@aaman/main/verify-max.directive';
import { VerifyLengthDirective } from '@aaman/main/verify-fix-length.directive';
import { VerifyMultipleOfDirective } from '@aaman/main/verify-multiple-of.directive';
import { VerifyEqualsDirective } from '@aaman/main/verify-equals.directive';

const validators = [
  VerifyEmailDirective,
  VerifyMinDirective,
  VerifyMaxDirective,
  VerifyLengthDirective,
  VerifyMultipleOfDirective,
  VerifyEqualsDirective
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
    NotificationService,
    FirmResolver,
    UserProfileResolver,
    OptionsService
  ],
  declarations: [
    MailingDetailsComponent,
    DialogComponent,
    BillingDetailsComponent,
    validators,
    PaginationComponent
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MailingDetailsComponent,
    validators,
    PaginationComponent
  ],
  entryComponents: [
    DialogComponent,
    MailingDetailsComponent,
    BillingDetailsComponent
  ]
})
export class BaseModule { }
