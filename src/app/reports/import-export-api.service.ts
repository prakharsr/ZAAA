import { Injectable } from '@angular/core';
import { ApiService } from '../services';

@Injectable()
export class ImportExportApiService {

  constructor(private api: ApiService) { }

  private export(url: string) {
    return this.api.post(url, { }, { responseType: 'blob' });
  }

  mediaHouseExport() {
    return this.export('/user/excel/export/mediahouse');
  }

  clientExport() {
    return this.export('/user/excel/export/client');
  }

  executiveExport() {
    return this.export('/user/excel/export/executive');
  }

  ratecardExport() {
    return this.export('/user/excel/export/ratecard');
  }
}
