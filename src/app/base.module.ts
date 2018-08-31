import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { NgBootstrapModule } from './ng-bootstrap.module';
import { LivechatWidgetModule } from '@livechat/angular-widget';
import { LineChartModule } from '@swimlane/ngx-charts';

import * as serv from './services';

import * as guards from './guards';

import {
  MailingDetailsComponent,
  DialogComponent,
  BillingDetailsComponent,
  PaginationComponent,
  LoginComponent
} from './components';

import * as ro from './release-order';

const roProviders = [
  ro.ReleaseOrderApiService,
  ro.ReleaseOrderResolver,
  ro.ReleaseOrderListResolver,
  ro.InsertionListResolver,
  ro.ReleaseOrderDirResolver
]

import { AuthTokenManager } from './services/auth-token-manager.service';
import { SuperAdminApiService } from './super-admin/super-admin-api.service';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { PreviewComponent } from './components/preview/preview.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SafeHtmlPipe } from './safe-html-pipe';
import { PaymentModePipe } from './payment-mode-pipe';

import * as acc from './accounts';

const accountsProviders = [
  acc.AccountsApiService,
  acc.SummarySheetListResolver,
  acc.ClientReceiptsListResolver,
  acc.ClientPaymentsListResolver,
  acc.ExecutivePaymentsListResolver,
  acc.NotesListResolver,
  acc.InvoiceTaxListResolver,
  acc.MediaHouseInvoiceListResolver,
  acc.MhReceiptListResolver
]

import { CoUserApiService, CoUsersResolver } from './co-users';

import * as dir from './directory';

const dirProviders = [
  dir.ClientApiService,
  dir.ExecutiveApiService,
  dir.MediaHouseApiService,
  dir.ClientResolver,
  dir.ExecutiveResolver,
  dir.MediaHouseResolver,
  dir.ClientListResolver,
  dir.ExecutiveListResolver,
  dir.MediaHouseListResolver
]

import * as invoice from './invoice';

const invoiceProviders = [
  invoice.InvoiceApiService,
  invoice.InvoiceResolver,
  invoice.InvoiceListResolver,
  invoice.InvoiceDirResolver
]

import * as rc from './rate-card';

const ratecardProviders = [
  rc.RateCardApiService,
  rc.RateCardResolver,
  rc.RateCardListResolver
]

import * as receipts from './receipts';

const receiptsProviders = [
  receipts.ReceiptsApiService,
  receipts.ReceiptResolver,
  receipts.ReceiptListResolver
]

import { SuperAdminGuard } from './super-admin/super-admin-guard.service';

import * as val from './validators';

import { MediaHouseInvoiceDialogComponent } from './accounts';
import { PaymentDetailsDialogComponent } from './accounts/payment-details-dialog/payment-details-dialog.component';
import { SelectReleaseOrderComponent } from './invoice/select-release-order/select-release-order.component';
import { SelectInvoiceComponent } from './receipts/select-invoice/select-invoice.component';

const validators = [
  val.VerifyEmailDirective,
  val.VerifyMinDirective,
  val.VerifyMaxDirective,
  val.VerifyLengthDirective,
  val.VerifyMultipleOfDirective,
  val.VerifyEqualsDirective
];

const pipes = [
  SafeHtmlPipe,
  PaymentModePipe
]

const overlays = [
  DialogComponent,
  ro.CategoriesDetailsComponent,
  MailingDetailsComponent,
  BillingDetailsComponent,
  ro.InsertionDetailsComponent,
  PreviewComponent,
  NotificationsComponent,
  MediaHouseInvoiceDialogComponent,
  PaymentDetailsDialogComponent,
  SelectReleaseOrderComponent,
  SelectInvoiceComponent
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgBootstrapModule.forRoot(),
    LivechatWidgetModule,
    LineChartModule
  ],
  declarations: [
    overlays,
    validators,
    PaginationComponent,
    LoginComponent,
    TicketListComponent,
    TestimonialComponent,
    pipes
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgBootstrapModule,
    validators,
    PaginationComponent,
    LivechatWidgetModule,
    LineChartModule,
    overlays,
    pipes
  ],
  entryComponents: [
    overlays
  ]
})
export class BaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaseModule,
      providers: [
        AuthTokenManager,

        guards.UserCache,
        guards.Guard,

        serv.ApiService,
        serv.WindowService,
        serv.RazorPayService,
        serv.IfscService,
        serv.DialogService,
        serv.StateApiService,
        serv.LoaderService,
        serv.NotificationService,
        serv.FirmResolver,
        serv.UserProfileResolver,
        serv.OptionsService,
        serv.FirmUsersResolver,
    
        CoUserApiService,
        CoUsersResolver,
    
        dirProviders,
        ratecardProviders,
        roProviders,
        invoiceProviders,
        receiptsProviders,
        accountsProviders,
    
        SuperAdminApiService,
        SuperAdminGuard
      ]
    };
  }
}
