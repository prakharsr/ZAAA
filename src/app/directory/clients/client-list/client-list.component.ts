import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from '../client';
import { ClientApiService } from '../client-api.service';
import { DialogService } from 'app/services';
import { PageData } from 'app/models';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];

  pageCount: number;
  page: number;

  query: string;
  searchFailed = false;

  constructor(private api: ClientApiService,
    private dialog: DialogService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { list: PageData<Client> }) => {
      this.clients = data.list.list;
      this.pageCount = data.list.pageCount;
      this.page = data.list.page;
    });
  }

  search = (text: Observable<string>) =>
    text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term =>
        this.api.searchClients(term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }));

  inputFormatter = (result: Client) => {
    this.router.navigateByUrl('/dir/clients/' + result.id);
  }

  deleteClient(client: Client) {
    this.dialog.confirmDeletion("Are you sure you want to delete this client?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteClient(client).subscribe(
        data => {
          if (data.success) {
            this.clients = this.clients.filter(c => c.id !== client.id);
          }
          else {
            console.log(data);
          }
        },
        err => console.log(err)
      );
    });
  }

  navigate(i: number) {
    this.router.navigate(['/dir/clients/list', i]);
  }
}
