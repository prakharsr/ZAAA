import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentsResponse, AccountsApiService, PaymentTotalResponse } from '../accounts-api.service';
import { ClientApiService, Client } from 'app/directory';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from 'app/models';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-client-invoice-payments',
  templateUrl: './client-invoice-payments.component.html',
  styleUrls: ['./client-invoice-payments.component.css']
})
export class ClientInvoicePaymentsComponent implements OnInit {

  page: number;
  pageCount: number;

  shadow = 0;
  balance = 0;
  totalBalance = 0;

  client;

  list: PaymentsResponse[] = [];

  constructor(private api: AccountsApiService,
    private clientApi: ClientApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { total: PaymentTotalResponse, client: string }}) => {
      this.list = data.resolved.total.list.list;

      let cl = new Client();
      cl.orgName = data.resolved.client;

      this.client = cl;

      this.shadow = data.resolved.total.shadow;
      this.balance = data.resolved.total.balance;
      this.totalBalance = data.resolved.total.totalBalance;

      this.page = data.resolved.total.list.page;
      this.pageCount = data.resolved.total.list.pageCount;
    });
  }

  search(pageNo: number) {
    this.router.navigate(['/accounts/clientinvoicepayments/list/', pageNo], {
      queryParams: {
        client: this.clientName
      }
    });
  }

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientNameFormatter = (client: Client) => client.orgName;

  private get clientName() {
    if (this.client instanceof String) {
      return this.client;
    }

    return this.client ? this.client.orgName : null;
  }

}
