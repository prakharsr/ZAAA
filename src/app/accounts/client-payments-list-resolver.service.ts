import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from 'app/models';
import { PaymentsResponse, AccountsApiService } from '.';

class Result {
  list: PageData<PaymentsResponse>;
  client: string;
}

@Injectable()
export class ClientPaymentsListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let client = route.queryParamMap.get('client');

    return this.api.clientPayments(page, client).map(releaseorder => {
      if (releaseorder) {
        return {
          list: releaseorder,
          client: client
        }
      }
      else {
        return null;
      }
    })
  }
}