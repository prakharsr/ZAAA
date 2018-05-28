import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentsResponse, AccountsApiService } from '../accounts-api.service';
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

  client;

  list: PaymentsResponse[] = [];

  constructor(private api: AccountsApiService,
    private clientApi: ClientApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentsResponse>, client: string }}) => {
      this.list = data.resolved.list.list;

      let cl = new Client();
      cl.orgName = data.resolved.client;

      this.client = cl;

      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;
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
