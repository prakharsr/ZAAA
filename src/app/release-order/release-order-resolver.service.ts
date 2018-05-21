import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrder } from '@aaman/releaseorder/release-order';
import { ReleaseOrderApiService } from '@aaman/releaseorder/release-order-api.service';

@Injectable()
export class ReleaseOrderResolver implements Resolve<ReleaseOrder> {
  constructor(private api: ReleaseOrderApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReleaseOrder> {
    let id = route.paramMap.get(route.paramMap.has('copy') ? 'copy' : 'id');

    return this.api.getReleaseOrder(id).take(1).map(releaseorder => {
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