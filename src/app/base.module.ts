import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SafeHtmlPipe } from './safe-html-pipe';

const validators = [
  VerifyEmailDirective,
  VerifyMinDirective,
  VerifyMaxDirective,
  VerifyLengthDirective,
  VerifyMultipleOfDirective,
  VerifyEqualsDirective
];

import {
  NgbRatingModule,
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbCollapseModule
} from '@ng-bootstrap/ng-bootstrap';

const ngbModules = [
  NgbRatingModule,
  NgbDatepickerModule,
  NgbTypeaheadModule,
  NgbCollapseModule
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ngbModules,
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
    PreviewComponent,
    TestimonialComponent,
    NotificationsComponent,
    SafeHtmlPipe
  ],
  exports: [
    CommonModule,
    RouterModule,
    ngbModules,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    MailingDetailsComponent,
    validators,
    PaginationComponent,
    LivechatWidgetModule,
    LineChartModule,
    SafeHtmlPipe
  ],
  entryComponents: [
    DialogComponent,
    CategoriesDetailsComponent,
    MailingDetailsComponent,
    BillingDetailsComponent,
    InsertionDetailsComponent,
    PreviewComponent,
    NotificationsComponent
  ]
})
export class BaseModule { }
