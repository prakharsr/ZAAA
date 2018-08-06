import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { LivechatWidgetModule } from '@livechat/angular-widget';
import { LineChartModule } from '@swimlane/ngx-charts';

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
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { RouterModule } from '@angular/router';
import { PreviewComponent } from './components/preview/preview.component';

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
    RouterModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MaterialModule,
    LivechatWidgetModule,
    LineChartModule
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
    LoginComponent,
    TicketListComponent,
    PreviewComponent
  ],
  exports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MailingDetailsComponent,
    validators,
    PaginationComponent,
    LivechatWidgetModule,
    LineChartModule
  ],
  entryComponents: [
    DialogComponent,
    CategoriesDetailsComponent,
    MailingDetailsComponent,
    BillingDetailsComponent,
    InsertionDetailsComponent,
    PreviewComponent
  ]
})
export class BaseModule { }
