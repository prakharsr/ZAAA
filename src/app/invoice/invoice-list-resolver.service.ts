import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from '../models/page-data';
import { ReleaseOrderSearchParams } from '../release-order/release-order-search-params';
import { Invoice } from './invoice';
import { InvoiceApiService } from './invoice-api.service';

class Result {
  list: PageData<Invoice>;
  search: ReleaseOrderSearchParams;
}

@Injectable()
export class InvoiceListResolver implements Resolve<Result> {
  constructor(private api: InvoiceApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let searchParams = new ReleaseOrderSearchParams(route.queryParamMap.get('mediaHouse'),
      route.queryParamMap.get('edition'),
      route.queryParamMap.get('client'),
      route.queryParamMap.get('executive'),
      route.queryParamMap.get('executiveOrg'),
      +route.queryParamMap.get('past'));

    return this.api.searchInvoices(page, searchParams).map(invoices => {
      if (invoices) {
        return {
          list: invoices,
          search: searchParams
        }
      }
      else {
        return null;
      }
    })
  }
}