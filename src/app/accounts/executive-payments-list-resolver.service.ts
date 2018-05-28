import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from 'app/models';
import { PaymentsResponse, AccountsApiService } from '.';

class Result {
  list: PageData<PaymentsResponse>;
  executive: string;
  executiveOrg: string;
}

@Injectable()
export class ExecutivePaymentsListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');

    let executive = route.queryParamMap.get('executive');
    let executiveOrg = route.queryParamMap.get('executiveOrg');

    return this.api.executivePayments(page, executive, executiveOrg).map(releaseorder => {
      if (releaseorder) {
        return {
          list: releaseorder,
          executive: executive,
          executiveOrg: executiveOrg
        }
      }
      else {
        return null;
      }
    })
  }
}