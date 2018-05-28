import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AccountsApiService, PaymentsResponse } from '../accounts-api.service';
import { ExecutiveApiService, Executive } from 'app/directory';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from 'app/models';

@Component({
  selector: 'app-executive-invoice-payments',
  templateUrl: './executive-invoice-payments.component.html',
  styleUrls: ['./executive-invoice-payments.component.css']
})
export class ExecutiveInvoicePaymentsComponent implements OnInit {

  page;
  pageCount;

  executive;
  executiveOrg;

  list: PaymentsResponse[] = [];

  constructor(private api: AccountsApiService,
    private executiveApi: ExecutiveApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentsResponse>, executive: string, executiveOrg: string }}) => {
      this.list = data.resolved.list.list;

      let exe = new Executive();
      exe.executiveName = data.resolved.executive;
      exe.orgName = data.resolved.executiveOrg;

      this.executive = this.executiveOrg = exe;

      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;
    });
  }

  search(pageNo: number) {
    this.router.navigate(['/accounts/executiveinvoicepayments/list/', pageNo], {
      queryParams: {
        executive: this.executiveName,
        executiveOrg: this.exeOrg
      }
    });
  }

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

  private get exeOrg() {
    if (this.executiveOrg instanceof String) {
      return this.executiveOrg;
    }

    return this.executiveOrg ? this.executiveOrg.orgName : null;
  }
}
