import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from '../models/page-data';
import { ReleaseOrder } from './release-order';
import { ReleaseOrderSearchParams } from './release-order-search-params';

@Injectable()
export class ReleaseOrderSearchResolver implements Resolve<ReleaseOrderSearchParams> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReleaseOrderSearchParams {
    return new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      route.queryParamMap.get('client'),
      route.queryParamMap.get('executive'),
      route.queryParamMap.get('executiveOrg'),
      +route.queryParamMap.get('past'));
  }
}