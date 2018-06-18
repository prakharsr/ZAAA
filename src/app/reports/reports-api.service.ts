import { Injectable } from '@angular/core';
import { ApiService } from '../services';

@Injectable()
export class ReportsApiService {

  constructor(private api: ApiService) { }

  mediaHouseReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/mediahouse', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  clientReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/clients', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  executiveReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/executive', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  invoiceReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/invoice', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  releaseOrderReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/releaseOrder', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  receiptReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/receipt', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  mediaHouseInvoiceReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/mediahouseInvoice', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  mediaHouseNotesReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/mediahouseNotes', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  clientNotesReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/clientNote', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }

  ratecardReport(creationPeriod: number, updationPeriod: number) {
    return this.api.post('/user/reports/ratecard', {
      creationPeriod: creationPeriod,
      updationPeriod: updationPeriod
    }, { responseType: 'blob' });
  }
}
