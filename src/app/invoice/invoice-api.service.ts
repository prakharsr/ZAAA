import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../services/api.service';
import { Invoice } from './invoice';
import { PageData } from '../models/page-data';

@Injectable()
export class InvoiceApiService {

  constructor(private api: ApiService) { }

  createInvoice(invoice: Invoice) {
    return this.api.post('/user/invoice', invoice);
  }

  getInvoice(id: string): Observable<Invoice> {
    return this.api.get('/user/invoice/' + id).map(data => {
      if (data.success) {
        return data.invoice;
      }

      return null;
    });
  }

  getInvoices(page: number): Observable<PageData<Invoice>> {
    return this.api.get('/user/invoices/' + page).map(data => {
      let invoices: Invoice[] = [];

      if (data.success) {
        invoices = data.invoices;
      }

      return new PageData<Invoice>(invoices, data.perPage, data.page, data.pageCount);
    });
  }
}
