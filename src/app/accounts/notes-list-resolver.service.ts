import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageData } from 'app/models';
import { AccountsApiService } from '.';
import { CreditDebitNote } from './credit-debit-note';

class Result {
  list: PageData<CreditDebitNote>;
  client?: string;
  publication?: string;
  edition?: string;
}

@Injectable()
export class NotesListResolver implements Resolve<Result> {
  constructor(private api: AccountsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> {
    let page: any = route.paramMap.get('page');


    let client = route.queryParamMap.get('client');
    let publication = route.queryParamMap.get('publication');
    let edition = route.queryParamMap.get('edition');

    if (route.data.clientNote) {
      return this.api.searchClientNotes(page, client).map(data => {
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
    else if (route.data.mediaHouseNote) {
      return this.api.searchMediaHouseNotes(page, publication, edition).map(data => {
        if (data) {
          return {
            list: data,
            publication: publication,
            edition: edition
          }
        }
        else {
          return null;
        }
      });
    }    
  }
}