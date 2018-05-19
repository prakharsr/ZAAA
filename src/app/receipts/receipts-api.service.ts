import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { PaymentReceipt } from './payment-receipt';
import { Observable } from 'rxjs/Observable';
import { PageData } from '../models/page-data';
import { ReleaseOrderSearchParams } from '../release-order/release-order-search-params';
import { map } from 'rxjs/operators';
import { MailingDetails } from '../models/mailing-details';

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

  getReceipt(id: string): Observable<PaymentReceipt> {
    return this.api.get('/user/receipt/' + id).map(data => data.success ? this.bodyToReceipt(data.receipt) : null);
  }

  searchReceipts(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<PaymentReceipt>> {
    return this.api.post('/user/receipt/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      date: params.past
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
  
}
