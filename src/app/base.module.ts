import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { LivechatWidgetModule } from '@livechat/angular-widget';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
  PaginationComponent,
  LoginComponent
} from './components';

import {
  VerifyEmailDirective,
  VerifyMinDirective,
  VerifyMaxDirective,
  VerifyLengthDirective,
  VerifyMultipleOfDirective,
  VerifyEqualsDirective
} from './validators';

import { CategoriesDetailsComponent, InsertionDetailsComponent } from './release-order';
import { AuthTokenManager } from './services/auth-token-manager.service';
import { SuperAdminApiService } from './super-admin/super-admin-api.service';

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
    MaterialModule,
    LivechatWidgetModule,
    NgxChartsModule
  ],
  providers: [
    AuthTokenManager,
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
    FirmUsersResolver,
    SuperAdminApiService
  ],
  declarations: [
    MailingDetailsComponent,
    DialogComponent,
    BillingDetailsComponent,
    CategoriesDetailsComponent,
    InsertionDetailsComponent,
    validators,
    PaginationComponent,
    LoginComponent
  ],
  exports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MailingDetailsComponent,
    validators,
    PaginationComponent,
    LivechatWidgetModule,
    NgxChartsModule,
    LoginComponent
  ],
  entryComponents: [
    DialogComponent,
    CategoriesDetailsComponent,
    MailingDetailsComponent,
    BillingDetailsComponent,
    InsertionDetailsComponent
  ]
})
export class BaseModule { }
