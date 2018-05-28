import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from 'app/services';
import { ReleaseOrderSearchParams, InsertionCheckItem } from 'app/release-order';
import { PageData } from 'app/models';
import { MediaHouseInvoiceItem } from './media-house-invoice-item';
import { PaymentReceipt } from '../receipts';

export class PaymentsResponse {
  publicationName = "";
  publicationEdition = "";
  clientName = "";
  invoiceNO = "";
  shadow = 0;
  balance = 0;
  totalBalance = 0;
  executiveOrg = "";
  executiveName = "";
}

@Injectable()
export class AccountsApiService {

  constructor(private api: ApiService) { }

  searchMediaHouseInvoice(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<MediaHouseInvoiceItem>> {
    return this.api.post('/user/mediahouseinvoice/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      insertionPeriod: params.past
    }).pipe(
      map(data => {
        let mediahouseinvoices : MediaHouseInvoiceItem[] = [];

        if (data.success) {
          mediahouseinvoices = data.insertions;
        }

        return new PageData<MediaHouseInvoiceItem>(mediahouseinvoices, data.perPage, data.page, data.pageCount);
      })
    );
  }

  setReceiptStatus(receipt: PaymentReceipt, status: number) {
    return this.api.post('/user/receipt/status', {
      receiptID: receipt.id,
      status: status
    });
  }

  private pipePayments(base: Observable<any>): Observable<PageData<PaymentsResponse>> {
    return base.pipe(
      map(data => {
          let result: PaymentsResponse[] = [];

          if (data.success) {
            data.invoices.forEach((invoice: { entries: PaymentsResponse[] }) => {
              invoice.entries.forEach(entry => result.push(entry));
            });
          }

          return new PageData<PaymentsResponse>(result, data.perPage, data.page, data.pageCount);
        }
      )
    );
  }

  executivePayments(page: number, executiveName: string, executiveOrg: string): Observable<PageData<PaymentsResponse>> {
    return this.pipePayments(this.api.post('/user/invoice/executivePayments', {
      page: page,
      executiveName: executiveName,
      executiveOrg: executiveOrg
    }));
  }

  clientPayments(page: number, clientName: string): Observable<PageData<PaymentsResponse>> {
    return this.pipePayments(this.api.post('/user/invoice/clientPayments', {
      page: page,
      executiveName: clientName
    }));
  }
}
