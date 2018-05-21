import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from '@aaman/main/page-data';
import { InsertionCheckItem } from '@aaman/releaseorder/insertion-check-item';
import { ReleaseOrderSearchParams } from '@aaman/releaseorder/release-order-search-params';
import { ReleaseOrderApiService } from '@aaman/releaseorder/release-order-api.service';

class Result {
  list: PageData<InsertionCheckItem>;
  search: ReleaseOrderSearchParams;
}

@Injectable()
export class InsertionListResolver implements Resolve<Result> {
  constructor(private api: ReleaseOrderApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      route.queryParamMap.get('client'),
      route.queryParamMap.get('executive'),
      route.queryParamMap.get('executiveOrg'),
      +route.queryParamMap.get('past'));

    return this.api.searchInsertions(page, searchParams).map(insertion => {
      if (insertion) {
        return {
          list: insertion,
          search: searchParams
        }
      }
      else {
        return null;
      }
    });
  }
}