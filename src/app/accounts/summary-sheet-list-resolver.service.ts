import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { AccountsApiService, SummarySheetResponse } from './accounts-api.service';

class Result {
  list: SummarySheetResponse[];
  search: ReleaseOrderSearchParams;
}

@Injectable()
export class SummarySheetListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      null, null, null,
      +route.queryParamMap.get('past'));

    return this.api.searchSummarySheet(searchParams).map(mediahouseinvoices => {
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