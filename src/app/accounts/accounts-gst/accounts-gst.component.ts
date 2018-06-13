import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ClientApiService, Client } from 'app/directory';
import { of } from 'rxjs/observable/of';
import { AccountsApiService } from '../accounts-api.service';
import { PageData } from 'app/models';
import { NotificationService, WindowService } from 'app/services';

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
    private router: Router,
    private notifications: NotificationService,
    private windowService: WindowService) { }

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
        cl.orgName = data.resolved.client;

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

  downloadSheet()
  {
    let base: Observable<any> = null;

    if (this.clientTax) {
      base = this.api.generateInvoiceTaxClient(this.clientName);
    }

    if (this.monthTax) {
      base = this.api.generateInvoiceTaxMonth(this.month);
    }

    base.subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let url = this.windowService.window.URL.createObjectURL(blob);

        let a = this.windowService.window.document.createElement('a');
        a.setAttribute('style', 'display:none;');
        this.windowService.window.document.body.appendChild(a);
        a.download = 'tax.xlsx';
        a.href = url;
        a.click();
      }
    });
  }
}
