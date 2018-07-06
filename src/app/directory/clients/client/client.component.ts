import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ContactPerson } from '../client';
import { ClientApiService } from '../client-api.service';
import { StateApiService, NotificationService } from 'app/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client = new Client();
  backup = new Client();

  id: string;

  new = false;

  editClientDetails = false;
  editContactDetails = false;
  editContactPersonDetails = false;

  moreClientDetails = false;
  moreContactDetails = false;
  moreContactPersonDetails = false;

  constructor(private api: ClientApiService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.route.data.subscribe((data: { client: Client }) => {
          this.client = data.client;
          Object.assign(this.backup, this.client);
        });

      }
      else {
        this.new = true;
        this.client.contactpersons = [new ContactPerson()];

        this.editClientDetails = this.editContactDetails = this.editContactPersonDetails = true;
      } 
      
    });
  }

  private stopEditing() {
    this.editClientDetails = false;
    this.editContactDetails = false;
    this.editContactPersonDetails = false;
  }

  get editing() {
    return this.editClientDetails
     || this.editContactDetails
     || this.editContactPersonDetails;
  }

  private goBack() {
    this.router.navigateByUrl(this.new ? '/dir/clients/' + this.id : '/dir/clients');
  }

  submit () {
    let base: Observable<any>;

    if (this.new) {
      base = this.api.createClient(this.client);
    }
    else base = this.api.editClient(this.client);

    base.subscribe(
      data => {
        if (data.success) {
          this.notifications.show("Saved");
        
          this.stopEditing();
        
          Object.assign(this.backup, this.client);
        }
        else {
          console.log(data);
          
          this.notifications.show(data.msg);
        }
      }
    )
  }

  cancel() {
    this.stopEditing();

    Object.assign(this.client, this.backup);
  }

  cancelCreate() {
    this.goBack();
  }

  addContactPerson(){
    this.client.contactpersons.push(new ContactPerson());
  }
  removeContactPerson(i: number){
    this.client.contactpersons.splice(i, 1);
  }

}
