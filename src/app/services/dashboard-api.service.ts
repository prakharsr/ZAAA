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
  collected = 0;
  completed = 0;
  pending = 0;
  received = 0;
}

export class MhiData {
  collectedAmount = 0;
  totalAmount = 0;
  pendingAmount = 0;
}

export class DuesData {
  count = 0;
  OverDueAmount = 0;
  DueAmount = 0;
}

export class PaidUnpaidData {
  count = 0;
  UnpaidAmount = 0;
  PaidAmount = 0;
}

@Injectable()
export class DashboardApiService {

  constructor(private api: ApiService) { }

  getRoChartData(filter = 1) {
    return this.api.post('/user/dashboard/releaseorder', {
      filter: filter
    });
  }

  getInvoiceData(filter = 1) : Observable<InvoiceGenData> {
    return this.api.post('/user/dashboard/invoice', {
      filter: filter
    }).pipe(
      map(data => {
        let result = new InvoiceGenData();

        if (data.success) {
          Object.assign(result, data.invoices[0]);
        }

        return result;
      })
    );
  }

  getDuesData(filter = 1): Observable<DuesData> {
    return this.api.post('/user/dashboard/clientDues', {
      filter: filter
    }).pipe(
      map(data => {
        let result = new DuesData();

        if (data.success) {
          Object.assign(result, data.receipt[0]);
        }

        return result;
      })
    );
  }

  getPaymentsData(filter = 1) : Observable<PaymentsData> {
    return this.api.post('/user/dashboard/clientPayments', {
      filter: filter
    }).pipe(
      map(data => {
        let result = new PaymentsData();

        if (data.success) {
          Object.assign(result, data.invoices[0]);
        }

        return result;
      })
    );
  }

  getMhiData(filter = 1): Observable<MhiData> {
    return this.api.post('/user/dashboard/mediahouseinvoice', {
      filter: filter
    }).pipe(
      map(data => {
        let result = new MhiData();

        if (data.success) {
          Object.assign(result, data.mhinvoices[0]);
        }

        return result;
      })
    );
  }

  getPaidUnpaid(filter = 1): Observable<PaidUnpaidData> {
    return this.api.post('/user/dashboard/paidUnpaid', {
      filter: filter
    }).pipe(
      map(data => {
        let result = new PaidUnpaidData();

        if (data.success) {
          Object.assign(result, data.mhinvoices[0]);
        }

        return result;
      })
    );
  }

  getReceiptCheque(filter = 1) {
    return this.api.post('/user/dashboard/receiptCheque', {
      filter: filter
    });
  }

  getReceiptChequeDetails(filter = 1) {
    return this.api.post('/user/dashboard/receiptChequeDetails', {
      filter: filter
    });
  }

  getMhiChequeDetails(filter = 1) {
    return this.api.post('/user/dashboard/mediahouseInvoiceChequeDetails', {
      filter: filter
    });
  }

  getMhiCheque(filter = 1) {
    return this.api.post('/user/dashboard/mhiCheque', {
      filter: filter
    });
  }  
}
