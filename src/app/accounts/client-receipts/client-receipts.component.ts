import { Component, OnInit } from '@angular/core';
import { PaymentReceipt } from 'app/receipts';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { PageData, UserProfile } from 'app/models';
import { ActivatedRoute } from '@angular/router';
import { ClientApiService, Client } from 'app/directory';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

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
    private clientApi: ClientApiService) {
    this.allUsers.name = "All Users";
    this.selectedUser = this.allUsers;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<PaymentReceipt>, search: ReleaseOrderSearchParams }, users: UserProfile[]}) => {
      this.receipts = data.resolved.list.list;

      this.users = data.users;
      this.users.unshift(this.allUsers);

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

  mark(receipt: PaymentReceipt, status: number) {}

}
