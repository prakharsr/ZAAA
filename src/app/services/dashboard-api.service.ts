import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export class InvoiceGenData {
  count = 0;
  totalAmount = 0;
  generated = 0;
}

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

export class DuesData {
  count: 2;
  OverDueAmount: 0;
  DueAmount: 0;
}

@Injectable()
export class DashboardApiService {

  constructor(private api: ApiService) { }

  getRoChartData() {
    return this.api.post('/user/dashboard/releaseorder', { });
  }

  getInvoiceData() : Observable<InvoiceGenData> {
    return this.api.post('/user/dashboard/invoice', { }).pipe(
      map(data => {
        let result = new InvoiceGenData();

        if (data.success) {
          Object.assign(result, data.invoices[0]);
        }

        return result;
      })
    );
  }

  getDuesData(): Observable<DuesData> {
    return this.api.post('/user/dashboard/clientDues', { }).pipe(
      map(data => {
        let result = new DuesData();

        if (data.success) {
          Object.assign(result, data.receipt[0]);
        }

        return result;
      })
    );
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
