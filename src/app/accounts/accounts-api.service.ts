import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from 'app/services';
import { ReleaseOrderSearchParams } from '@aaman/releaseorder/release-order-search-params';
import { PageData } from 'app/models';
import { InsertionCheckItem } from '@aaman/releaseorder/insertion-check-item';
import { MediaHouseInvoiceItem } from './media-house-invoice-item';

@Injectable()
export class AccountsApiService {

  constructor(private api: ApiService) { }

  searchMediaHouseInvoice(page: number, params: ReleaseOrderSearchParams) : Observable<PageData<MediaHouseInvoiceItem>> {
    return this.api.post('/user/mediahouseinvoice/search', {
      page: page,
      publicationName: params.mediaHouse,
      publicationEdition: params.edition,
      clientName: params.client,
      executiveName: params.executive,
      executiveOrg: params.executiveOrg,
      insertionPeriod: params.past
    }).pipe(
      map(data => {
        let mediahouseinvoices : MediaHouseInvoiceItem[] = [];

        if (data.success) {
          mediahouseinvoices = data.insertions;
        }

        return new PageData<MediaHouseInvoiceItem>(mediahouseinvoices, data.perPage, data.page, data.pageCount);
      })
    );
  }
}
