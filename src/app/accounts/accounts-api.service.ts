import { Injectable } from '@angular/core';
import { ApiService } from '@aaman/main/api.service';

@Injectable()
export class AccountsApiService {

  constructor(private api: ApiService) { }

  searchMediaHouseInvoice(page: number) {
    return this.api.post('/user/mediahouseinvoice/search', {
      page: page,
      insertionPeriod: 1000
    });
  }

}
