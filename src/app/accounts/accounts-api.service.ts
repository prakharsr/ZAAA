import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ApiService } from 'app/services';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { PageData, MailingDetails } from 'app/models';
import { PaymentReceipt } from '../receipts';
import { CreditDebitNote } from './credit-debit-note';
import { MediaHouseInvoice } from '.';

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

export class SummarySheetInsertion {
  _id = "";
  amount = 0;
}

export class SummarySheetResponse {
  collectedAmount = 0;
  count = 0;
  pendingAmount = 0;

  entries: {
    Amount: number;
    MHIGrossAmount: number,
    MHINo: string,
    collectedAmount: number,
    insertionDate: Date,
    pendingAmount: number,

    SheetAmount: number, // will be filled in summary sheet view
    checked: boolean,

    _id: string
  }[] = [];

  _id = {
    roId: "",
    publicationName: "",
    publicationEdition: ""
  }
}

@Injectable()
export class AccountsApiService {

  constructor(private api: ApiService) { }

  searchSummarySheet(params: ReleaseOrderSearchParams) : Observable<SummarySheetResponse[]> {
    return this.api.post('/user/summarySheet/search', {
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      insertionPeriod: params.past
    }).pipe(
      map(data => {
        let result: SummarySheetResponse[] = [];

        if (data.success) {
          result = data.insertions;
        }

        return result;
      })
    );
  }

  searchMediaHouseInvoices(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<MediaHouseInvoice>> {
    return this.api.post('/user/mediahouseinvoice/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      insertionPeriod: params.past
    }).pipe(
      map(data => {
        let mediahouseinvoices : MediaHouseInvoice[] = [];

        if (data.success) {
          mediahouseinvoices = data.mediahouseInvoice;
        }

        return new PageData<MediaHouseInvoice>(mediahouseinvoices, data.perPage, data.page, data.pageCount);
      })
    );
  }

  createMediaHouseInvoice(invoice: MediaHouseInvoice) {
    return this.api.post('/user/mediahouseinvoice/', invoice);
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

  private pipeTax(base: Observable<any>) : Observable<PageData<any>> {
    return base.pipe(
      map(data => {
        let list = [];

        if (data.success) {
          data.invoice.forEach(element => {
            let item = { };

            Object.assign(item, element);

            list.push(item);
          });
        }

        return new PageData<any>(list, data.perPage, data.page, data.pageCount);
      })
    );
  }

  queryInvoiceTaxClient(client: string, page: number) : Observable<PageData<any>> {
    return this.pipeTax(this.api.post('/user/invoice/tax', {
      clientName: client,
      page: page
    }));
  }

  private genPeriod(month: string) {
    let yyyy = +month.substr(0, 4);
    let mm = +month.substr(5, 2);

    let date = new Date(yyyy, mm - 1);
    date.setDate(0);

    return {
      day: date.getDate(),
      month: mm,
      year: yyyy
    };
  }

  queryInvoiceTaxMonth(month: string, page: number) : Observable<PageData<any>> {
    return this.pipeTax(this.api.post('/user/invoice/tax', {
      page: page,
      period: this.genPeriod(month)
    }));
  }

  generateInvoiceTaxClient(client: string) {
    return this.api.post('/user/invoice/taxSheet', {
      clientName: client
    }, { responseType: 'blob' });
  }

  generateInvoiceTaxMonth(month: string) {
    return this.api.post('/user/invoice/taxSheet', {
      period: this.genPeriod(month)
    }, { responseType: 'blob' });
  }

  generateSummarySheet(insertions: SummarySheetInsertion[]) {
    return this.api.post('/user/summarySheet', {
      mhis: insertions
    });
  }
}
