import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ApiService } from 'app/services';
import { PaymentReceipt, AdvanceReceipt } from './payment-receipt';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { PageData, MailingDetails } from 'app/models';
import { Invoice } from 'app/invoice';

export class ReceiptSearchParams extends ReleaseOrderSearchParams {
  user?: string;
}

@Injectable()
export class ReceiptsApiService {

  constructor(private api: ApiService) { }

  private bodyToReceipt(body: any) {
    let result = new PaymentReceipt();

    Object.assign(result, body);

    result.id = body._id;

    return result;
  }

  createReceipt(receipt: PaymentReceipt) {
    return this.api.post('/user/receipt', receipt);
  }

  createAdvanceReceipt(receipt: AdvanceReceipt) {
    return this.api.post('/user/receipt/advanced', receipt);
  }

  getReceipt(id: string): Observable<PaymentReceipt> {
    return this.api.get('/user/receipt/' + id).map(data => data.success ? this.bodyToReceipt(data.receipt) : null);
  }

  searchReceipts(page: number, params: ReceiptSearchParams, advance = false) : Observable<PageData<PaymentReceipt>> {
    return this.api.post(advance ? '/user/receipt/advanced/search/' : '/user/receipt/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      date: params.past,
      user: params.user
    }).pipe(
      map(data => {
        let receipts : PaymentReceipt[] = [];

        if (data.success) {
          data.receipt.forEach(element => {
            receipts.push(this.bodyToReceipt(element));
          });
        }

        return new PageData<PaymentReceipt>(receipts, data.perPage, data.page, data.pageCount);
      })
    );
  }

  link(invoice: Invoice, advancedReceipt: AdvanceReceipt) {
    return this.api.post('/user/receipt/advanced/link', {
      invoiceID: invoice.id,
      receiptID: advancedReceipt.id
    });
  }

  sendMail(receipt: PaymentReceipt, mailingDetails: MailingDetails) {
    return this.api.post('/user/receipt/email', {
      id: receipt.id,
      ...mailingDetails
    });
  }

  generate(receipt: PaymentReceipt) {
    return this.api.post('/user/receipt/download', {
      id: receipt.id
    }, { responseType: 'blob' });
  }

  previewReceipthtml(receipt: PaymentReceipt) {
    return this.api.post('/user/receipt/previewHtml', {
      receipt: receipt
    });
  }

  cancel(receipt: PaymentReceipt) {
    return this.api.post('/user/receipt/cancel', {
      id: receipt.id
    }).pipe(
      map(data => {
        if (data.success) {
          receipt.isCancelled = true;
        }

        return data;
      })
    );
  }
}
