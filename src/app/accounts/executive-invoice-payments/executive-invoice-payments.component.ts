import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AccountsApiService } from '../accounts-api.service';
import { ExecutiveApiService, Executive } from 'app/directory';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-executive-invoice-payments',
  templateUrl: './executive-invoice-payments.component.html',
  styleUrls: ['./executive-invoice-payments.component.css']
})
export class ExecutiveInvoicePaymentsComponent implements OnInit {

  res;

  page;
  pageCount;

  executive;
  executiveOrg;

  constructor(private api: AccountsApiService,
    private executiveApi: ExecutiveApiService) { }

  ngOnInit() {
    this.res = this.api.executivePayments(1, null, null);
  }

  search(page: number) { }

  searchExecutive = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutives(term))
      .catch(() => of([]));
  }

  private get executiveName() {
    if (this.executive instanceof String) {
      return this.executive;
    }

    return this.executive ? this.executive.executiveName : null;
  }

  searchExecutiveOrg = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutivesByOrg(this.executiveName, term))
      .catch(() => of([]));
  }

  executiveNameFormatter = (executive: Executive) => {
    this.executiveOrg = executive;

    return executive.executiveName;
  }
  
  executiveOrgFormatter = (executive: Executive) => executive.orgName;

}
