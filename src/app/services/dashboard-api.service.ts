import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export class PaymentsData {
  shadow = 0;
  collectedAmount = 0;
  completed = 0;
  totalAmount = 0;
  pendingAmount = 0;
}

export class MhiData {
  collectedAmount = 0;
  totalAmount = 0;
  pendingAmount = 0;
}

@Injectable()
export class DashboardApiService {

  constructor(private api: ApiService) { }

  getInvoiceData() {
    return this.api.post('/user/dashboard/invoice', { });
  }

  getDuesData() {
    return this.api.post('/user/dashboard/clientDues', { });
  }

  getPaymentsData() : Observable<PaymentsData> {
    return this.api.post('/user/dashboard/clientPayments', { }).pipe(
      map(data => {
        let result = new PaymentsData();

        if (data.success) {
          Object.assign(result, data.invoices[0]);
        }

        return result;
      })
    );
  }

  getMhiData(): Observable<MhiData> {
    return this.api.post('/user/dashboard/mediahouseinvoice', { }).pipe(
      map(data => {
        let result = new MhiData();

        if (data.success) {
          Object.assign(result, data.mhinvoices[0]);
        }

        return result;
      })
    );
  }
}
