import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrderPage } from './release-order-page';
import { ReleaseOrderApiService } from './release-order-api.service';

@Injectable()
export class ReleaseOrderListResolver implements Resolve<ReleaseOrderPage> {
  constructor(private api: ReleaseOrderApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReleaseOrderPage> {
    let page: any = route.paramMap.get('page');

    return this.api.getReleaseOrders(page).map(releaseorder => {
      if (releaseorder) {
        return releaseorder;
      }
      else { // id not found
        this.router.navigateByUrl('/releaseorders');
        return null;
      }
    });
  }
}