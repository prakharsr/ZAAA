import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from 'app/models';
import { AccountsApiService } from './accounts-api.service';

class Result {
  list: PageData<any>;
  client?: string;
  month?: string;
}

@Injectable()
export class InvoiceTaxListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let client = route.queryParamMap.get('client');
    let month = route.queryParamMap.get('month');

    if (route.data.clientTax) {
      return this.api.queryInvoiceTaxClient(client, page).map(data => {
        if (data) {
          return {
            list: data,
            client: client
          }
        }
        else {
          return null;
        }
      });
    }
    else if (route.data.monthTax) {
      if (!month) {
        let today = new Date();
        month = today.getFullYear() + '-' + (+today.getMonth() + 1).toString().padStart(2, '0');
      }

      return this.api.queryInvoiceTaxMonth(month, page).map(data => {
        if (data) {
          return {
            list: data,
            month: month
          }
        }
        else {
          return null;
        }
      });
    }    
  }
}