import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, Validator }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import {
  ApiService,
  WindowService,
  RazorPayService,
  IfscService,
  DialogService,
  StateApiService,
  LoaderService,
  NotificationService,
  OptionsService,
  FirmResolver,
  UserProfileResolver,
  FirmUsersResolver
} from './services';

import {
  AuthGuard,
  PhoneVerifyGuard,
  AdminGuard,
  PlanGuard
} from './guards';

import {
  MailingDetailsComponent,
  DialogComponent,
  BillingDetailsComponent,
  PaginationComponent
} from './components';

import {
  VerifyEmailDirective,
  VerifyMinDirective,
  VerifyMaxDirective,
  VerifyLengthDirective,
  VerifyMultipleOfDirective,
  VerifyEqualsDirective
} from './validators';

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
    OptionsService,
    FirmUsersResolver
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
