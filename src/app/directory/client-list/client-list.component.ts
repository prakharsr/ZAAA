import { Component, OnInit } from '@angular/core';
import { DirClient } from '../dirClient';
import { DirApiService } from '../dir-api.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: DirClient[] = [];

  constructor(private api: DirApiService, private dialog: DialogService) { }

  ngOnInit() {
    this.api.getClients().subscribe(data => this.clients = data);
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
