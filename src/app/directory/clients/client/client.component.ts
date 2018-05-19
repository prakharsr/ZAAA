import { Component, OnInit } from '@angular/core';
import { Client, ContactPerson } from '../client';
import { ClientApiService } from '../client-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateApiService } from '../../../services/state-api.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client = new Client();

  id: string;

  edit = false;

  constructor(private api: ClientApiService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.edit = true;

        this.route.data.subscribe((data: { client: Client }) => {
          this.client = data.client;
        });

        this.id = params.get('id');
      }
      else this.client.contactpersons = [new ContactPerson()];
    });
  }

  private goBack() {
    this.router.navigateByUrl(this.edit ? '/dir/clients/' + this.id : '/dir/clients');
  }

  private createClient() {
    this.api.createClient(this.client).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.notifications.show(data.msg);
        }
      }
    )
  }

  private editClient() {
    this.api.editClient(this.client).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.notifications.show(data.msg);
        }
      }
    )
  }

  submit () {
    if (this.edit) {
      this.editClient();
    }
    else this.createClient();
  }

  cancel() {
    this.goBack();
  }

  addContactPerson(){
    this.client.contactpersons.push(new ContactPerson());
  }
  removeContactPerson(i: number){
    this.client.contactpersons.splice(i, 1);
  }

}
