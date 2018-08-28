import { Injectable } from '@angular/core';
import { ApiService } from '../services';

@Injectable()
export class ImportExportApiService {

  constructor(private api: ApiService) { }

  private export(url: string) {
    return this.api.post(url, { }, { responseType: 'blob' });
  }

  private import(url: string, file: File) {
    return this.api.fileUpload(url, 'excelFile', file);
  }

  mediaHouseExport() {
    return this.export('/user/excel/export/mediahouse');
  }

  mediaHouseImport(file: File) {
    return this.import('/user/excel/import/mediahouse', file);
  }

  clientExport() {
    return this.export('/user/excel/export/client');
  }

  clientImport(file: File) {
    return this.import('/user/excel/import/client', file);
  }

  executiveExport() {
    return this.export('/user/excel/export/executive');
  }

  executiveImport(file: File) {
    return this.import('/user/excel/import/executive', file);
  }

  ratecardExport() {
    return this.export('/user/excel/export/ratecard');
  }

  ratecardImport(file: File) {
    return this.import('/user/excel/import/ratecard', file);
  }
}
