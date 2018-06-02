import { Component, OnInit } from '@angular/core';
import { PaymentReceipt, ReceiptSearchParams } from 'app/receipts';
import { PageData, UserProfile } from 'app/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService, Client } from 'app/directory';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AccountsApiService } from '../accounts-api.service';
import { NotificationService } from 'app/services';

@Component({
  selector: 'app-client-receipts',
  templateUrl: './client-receipts.component.html',
  styleUrls: ['./client-receipts.component.css']
})
export class ClientReceiptsComponent implements OnInit {

  receipts: PaymentReceipt[] = [];
  users: UserProfile[] = [];

  page: number;
  pageCount: number;

  client;
  pastDays = 0;
  selectedUser;

  allUsers = new UserProfile();

  constructor(private route: ActivatedRoute,
    private clientApi: ClientApiService,
    private api: AccountsApiService,
    private notifications: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.allUsers.name = "All Users";
    this.selectedUser = this.allUsers;

    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentReceipt>, search: ReceiptSearchParams }, users: UserProfile[]}) => {
      this.receipts = data.resolved.list.list;

      this.users = data.users;
      this.users.unshift(this.allUsers);

      let cl = new Client();
      cl.orgName = data.resolved.search.client;

      this.client = cl;

      if (data.resolved.search.user) {
        this.selectedUser = this.users.find(user => user.id == data.resolved.search.user);
      }

      this.pageCount = data.resolved.list.pageCount;
      this.page = data.resolved.list.page;
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

  mark(receipt: PaymentReceipt, status: number) {
    this.api.setReceiptStatus(receipt, status).subscribe(data => {
      if (data.success) {
        receipt.status = status;
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  search(pageNo: number) {
    let params = new ReceiptSearchParams(null, null, this.clientName, null, null, this.pastDays);

    if (this.selectedUser != this.allUsers) {
      params.user = this.selectedUser.id;
    }

    this.router.navigate(['/accounts/clientreceipts/list/', pageNo], {
      queryParams: params
    });
  }

}
