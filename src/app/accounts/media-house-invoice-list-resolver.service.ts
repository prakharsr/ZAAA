import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from 'app/models';
import { ReleaseOrderSearchParams } from '@aaman/releaseorder/release-order-search-params';
import { ReleaseOrderApiService } from '@aaman/releaseorder/release-order-api.service';
import { MediaHouseInvoiceItem } from './media-house-invoice-item';
import { AccountsApiService } from './accounts-api.service';

class Result {
  list: PageData<MediaHouseInvoiceItem>;
  search: ReleaseOrderSearchParams;
}

@Injectable()
export class MediaHouseInvoiceListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      route.queryParamMap.get('client'),
      route.queryParamMap.get('executive'),
      route.queryParamMap.get('executiveOrg'),
      +route.queryParamMap.get('past'));

    return this.api.searchMediaHouseInvoice(page, searchParams).map(mediahouseinvoices => {
      if (mediahouseinvoices) {
        return {
          list: mediahouseinvoices,
          search: searchParams
        }
      }
      else {
        return null;
      }
    });
  }
}