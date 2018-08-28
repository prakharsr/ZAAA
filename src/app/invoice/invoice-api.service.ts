import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ApiService } from 'app/services';
import { ClientApiService, MediaHouseApiService, ExecutiveApiService } from 'app/directory';
import { Invoice } from './invoice';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { PageData, MailingDetails } from 'app/models';
import { InvoiceDir } from './invoice-dir-resolver.service';
import { PaymentReceipt } from '../receipts';

@Injectable()
export class InvoiceApiService {

  constructor(private api: ApiService,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService) { }

  private bodyToInvoice(body: any) {
    let result = new Invoice();

    Object.assign(result, body);

    result.id = body._id;

    return result;
  }

  createInvoice(invoice: Invoice) {
    return this.api.post('/user/invoice', invoice);
  }

  getInvoice(id: string): Observable<Invoice> {
    return this.api.get('/user/invoice/' + id).map(data => data.success ? this.bodyToInvoice(data.invoice) : null);
  }

  searchInvoices(page: number, params: ReleaseOrderSearchParams, hasPendingAmount = false) : Observable<PageData<Invoice>> {
    return this.api.post('/user/invoice/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      date: params.past,
      hasPendingAmount: hasPendingAmount
    }).pipe(
      map(data => {
        let invoices : Invoice[] = [];

        if (data.success) {
          data.invoice.forEach(element => {
            invoices.push(this.bodyToInvoice(element));
          });
        }

        return new PageData<Invoice>(invoices, data.perPage, data.page, data.pageCount);
      })
    );
  }

  sendMail(invoice: Invoice, mailingDetails: MailingDetails) {
    return this.api.post('/user/invoice/email', {
      id: invoice.id,
      ...mailingDetails
    });
  }

  previewInvoicehtml(invoice: Invoice) {
    return this.api.post('/user/invoice/previewHtml', {
      invoice: invoice
    });
  }

  generate(invoice: Invoice) {
    return this.api.post('/user/invoice/download', {
      id: invoice.id
    }, { responseType: 'blob' });
  }

  getInvoiceDir(id: string): Observable<InvoiceDir> {
    return this.api.get('/user/invoice/' + id).pipe(
      map(data => data.success ? {
        invoice: this.bodyToInvoice(data.invoice),
        mediaHouse: this.mediaHouseApi.bodyToMediaHouse(data.mediahouse),
        client: this.clientApi.bodyToClient(data.client),
        executive: this.executiveApi.bodyToExecutive(data.executive)
       } : null)
    );
  }

  getPayedReceipts(invoice: Invoice): Observable<PaymentReceipt[]> {
    return this.api.post('/user/receipt/pre', {
      invoiceID: invoice.id
    }).pipe(
      map(data => {
        let result : PaymentReceipt[] = [];

        if (data.success) {
          result = data.receipts;
        }

        return result;
      })
    );
  }
}
