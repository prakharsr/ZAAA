import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClientApiService, Client } from 'app/directory';
import { of } from 'rxjs/observable/of';
import { AccountsApiService } from '../accounts-api.service';
import { PageData } from '../../models';

@Component({
  selector: 'app-accounts-gst',
  templateUrl: './accounts-gst.component.html',
  styleUrls: ['./accounts-gst.component.css']
})
export class AccountsGstComponent implements OnInit {

  page: number;
  pageCount: number;

  // YYYY-MM
  month: string;

  clientTax = false;
  monthTax = false;

  client;

  list = [];

  constructor(private route: ActivatedRoute,
    private clientApi: ClientApiService,
    private api: AccountsApiService,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: {
      clientTax: boolean,
      monthTax: boolean,
      resolved: {
        list: PageData<any>,
        client?: string,
        month?: string
      }
    }) => {
      this.clientTax = data.clientTax;
      this.monthTax = data.monthTax;

      this.list = data.resolved.list.list;
      
      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;

      if (this.clientTax) {
        let cl = new Client();
        this.client.orgName = data.resolved.client;

        this.client = cl;
      }

      if (this.monthTax) {
        this.month = data.resolved.month;
      }
    });
  }

  search(page: number) {
    this.router.navigate(['/accounts/gst', this.clientTax ? 'client' : 'month', 'list', page], {
      queryParams: this.clientTax ? { client: this.clientName } : {
        month: this.month
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
