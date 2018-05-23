import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PaymentReceipt } from '@aaman/receipts/payment-receipt';
import { PageData } from 'app/models';
import { ReleaseOrderSearchParams } from '@aaman/releaseorder/release-order-search-params';
import { ReceiptsApiService } from '@aaman/receipts/receipts-api.service';

class Result {
  list: PageData<PaymentReceipt>;
  search: ReleaseOrderSearchParams;
}

@Injectable()
export class ReceiptListResolver implements Resolve<Result> {
  constructor(private api: ReceiptsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      route.queryParamMap.get('client'),
      route.queryParamMap.get('executive'),
      route.queryParamMap.get('executiveOrg'),
      +route.queryParamMap.get('past'));

    return this.api.searchReceipts(page, searchParams, route.data.advance).map(receipt => {
      if (receipt) {
        return {
          list: receipt,
          search: searchParams
        }
      }
      else {
        return null;
      }
    })
  }
}