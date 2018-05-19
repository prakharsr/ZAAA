import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';
import { Invoice } from './invoice';
import { PageData } from '../models/page-data';
import { ReleaseOrderSearchParams } from '../release-order/release-order-search-params';
import { map } from 'rxjs/operators';
import { MailingDetails } from '../models/mailing-details';
import { ReleaseOrder } from '../release-order/release-order';
import { ClientApiService } from '../directory/clients/client-api.service';
import { MediaHouseApiService } from '../directory/media-houses/media-house-api.service';
import { ExecutiveApiService } from '../directory/executives/executive-api.service';
import { InvoiceDir } from './invoice-dir-resolver.service';

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

  searchInvoices(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<Invoice>> {
    return this.api.post('/user/invoice/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      date: params.past
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

}
