import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrderApiService } from './release-order-api.service';
import { PageData } from '../models/page-data';
import { InsertionCheckItem } from './insertion-check-item';

@Injectable()
export class InsertionListResolver implements Resolve<PageData<InsertionCheckItem>> {
  constructor(private api: ReleaseOrderApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageData<InsertionCheckItem>> {
    let page: any = route.paramMap.get('page');

    return this.api.getInsertions(page).map(insertion => {
      if (insertion) {
        return insertion;
      }
      else { // id not found
        this.router.navigateByUrl('/releaseorders/check');
        return null;
      }
    });
  }
}