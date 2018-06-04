import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from 'app/services';
import { ReleaseOrderSearchParams, InsertionCheckItem } from 'app/release-order';
import { PageData, MailingDetails } from 'app/models';
import { MediaHouseInvoiceItem } from './media-house-invoice-item';
import { PaymentReceipt } from '../receipts';
import { CreditDebitNote } from './credit-debit-note';

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

export class PaymentTotalResponse {
  shadow = 0;
  balance = 0;
  totalBalance = 0;

  list: PageData<PaymentsResponse>;
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

  private pipePayments(base: Observable<any>): Observable<PaymentTotalResponse> {
    return base.pipe(
      map(data => {
          let result = new PaymentTotalResponse();
          let arr: PaymentsResponse[] = [];

          if (data.success) {
            data.invoices.forEach((invoice: { balance: number, shadow: number, totalBalance: number, entries: PaymentsResponse[] }) => {
              invoice.entries.forEach(entry => arr.push(entry));

              result.shadow += invoice.shadow;
              result.balance += invoice.balance;
              result.totalBalance += invoice.totalBalance;
            });
          }

          result.list = new PageData<PaymentsResponse>(arr, data.perPage, data.page, data.pageCount);

          return result;
        }
      )
    );
  }

  executivePayments(page: number, executiveName: string, executiveOrg: string): Observable<PaymentTotalResponse> {
    return this.pipePayments(this.api.post('/user/invoice/executivePayments', {
      page: page,
      executiveName: executiveName,
      executiveOrg: executiveOrg
    }));
  }

  clientPayments(page: number, clientName: string): Observable<PaymentTotalResponse> {
    return this.pipePayments(this.api.post('/user/invoice/clientPayments', {
      page: page,
      executiveName: clientName
    }));
  }

  createMediaHouseNote(note: CreditDebitNote) {
    return this.api.post('/user/notes/mediahouse', note);
  }

  createClientNote(note: CreditDebitNote) {
    return this.api.post('/user/notes/client', note);
  }

  private pipeNotes(base: Observable<any>)  : Observable<PageData<CreditDebitNote>> {
    return base.pipe(
      map(data => {
        let list: CreditDebitNote[] = [];

        console.log(data);

        if (data.success) {
          data.note.forEach(element => {
            let item = new CreditDebitNote();

            Object.assign(item, element);

            list.push(item);
          });
        }

        return new PageData<CreditDebitNote>(list, data.perPage, data.page, data.pageCount);
      })
    );
  }

  searchClientNotes(page: number, client: string) : Observable<PageData<CreditDebitNote>> {
    return this.pipeNotes(this.api.post('/user/notes/client/search', {
      page: page,
      clientName: client
    }));
  }

  searchMediaHouseNotes(page: number, publication: string, edition: string) : Observable<PageData<CreditDebitNote>> {
    return this.pipeNotes(this.api.post('/user/notes/mediahouse/search', {
      page: page,
      publicationName: publication,
      publicationEdition: edition
    }));
  }

  mailNote(note: CreditDebitNote, mailingDetails: MailingDetails) {
    return this.api.post('/user/notes/email', {
      id: note._id,
      ...mailingDetails
    });
  }

  generateNotePdf(note: CreditDebitNote) {
    return this.api.post('/user/notes/download', {
      id: note._id
    }, { responseType: 'blob' });
  }
}
