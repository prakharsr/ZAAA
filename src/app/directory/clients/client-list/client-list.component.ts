import { Component, OnInit } from '@angular/core';
import { DirClient } from '../dirClient';
import { ClientApiService } from '../client-api.service';
import { DialogService } from '../../../services/dialog.service';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: DirClient[] = [];

  query: string;
  searchFailed = false;

  constructor(private api: ClientApiService, private dialog: DialogService, private router: Router) { }

  ngOnInit() {
    this.api.getClients().subscribe(data => this.clients = data);
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

  inputFormatter = (result: DirClient) => {
    this.router.navigateByUrl('/dir/clients/' + result.id);
  }

  deleteClient(client: DirClient) {
    this.dialog.confirm("Are you sure you want to delete this client?").subscribe(confirm => {
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
}
