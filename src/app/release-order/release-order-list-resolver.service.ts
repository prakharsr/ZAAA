import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrderApiService } from './release-order-api.service';
import { PageData } from '../models/page-data';
import { ReleaseOrder } from './release-order';
import { ReleaseOrderSearchParams } from './release-order-search-params';

class Result {
  list: PageData<ReleaseOrder>;
  search: ReleaseOrderSearchParams;
}

@Injectable()
export class ReleaseOrderListResolver implements Resolve<Result> {
  constructor(private api: ReleaseOrderApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      route.queryParamMap.get('client'),
      route.queryParamMap.get('executive'),
      route.queryParamMap.get('executiveOrg'),
      +route.queryParamMap.get('past'));

    return this.api.searchReleaseOrders(page, searchParams).map(releaseorder => {
      if (releaseorder) {
        return {
          list: releaseorder,
          search: searchParams
        }
      }
      else {
        return null;
      }
    })
  }
}