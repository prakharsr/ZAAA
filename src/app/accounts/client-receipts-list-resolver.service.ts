import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from 'app/models';
import { PaymentReceipt, ReceiptsApiService, ReceiptSearchParams } from 'app/receipts';

class Result {
  list: PageData<PaymentReceipt>;
  search: ReceiptSearchParams;
}

@Injectable()
export class ClientReceiptsListResolver implements Resolve<Result> {
  constructor(private api: ReceiptsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let searchParams = new ReceiptSearchParams(null, null,
      route.queryParamMap.get('client'), null, null,
      +route.queryParamMap.get('past'));

    searchParams.user = route.queryParamMap.get('user');

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