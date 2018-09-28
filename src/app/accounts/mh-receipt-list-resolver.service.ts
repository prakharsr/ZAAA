import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { AccountsApiService, MhReceiptResponse } from './accounts-api.service';

class Result {
  list: MhReceiptResponse[];
  search: ReleaseOrderSearchParams;
  batchID: string;
}

@Injectable()
export class MhReceiptListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      null, null, null,
      +route.queryParamMap.get('past'));

    let batchID = route.queryParamMap.get('batchID');

    return this.api.searchMediaHouseReceipts(searchParams).map(mhreceipts => {
      if (mhreceipts) {
        return {
          list: mhreceipts,
          search: searchParams,
          batchID: batchID
        }
      }
      else {
        return null;
      }
    });
  }
}