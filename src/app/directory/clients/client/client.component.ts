import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ContactPerson } from '../client';
import { ClientApiService } from '../client-api.service';
import { StateApiService, NotificationService } from 'app/services';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client = new Client();
  backup = new Client();
  backupContactPersons: ContactPerson[] = [];

  private makeBackup() {
    Object.assign(this.backup, this.client);

    this.backupContactPersons = [];
    this.client.contactpersons.forEach(person => {
      let item = new ContactPerson();

      Object.assign(item, person);

      this.backupContactPersons.push(item);
    });
  }

  private restoreBackup() {
    Object.assign(this.client, this.backup);

    this.client.contactpersons = [];
    this.backupContactPersons.forEach(person => {
      let item = new ContactPerson();

      Object.assign(item, person);

      this.client.contactpersons.push(item);
    });
  }

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
          this.makeBackup();
        });

      }
      else {
        this.new = true;
        this.client.contactpersons = [new ContactPerson()];

        this.editClientDetails = this.editContactDetails = this.editContactPersonDetails = true;

        this.makeBackup();
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

  private goToList() {
    this.router.navigateByUrl('/dir/clients/');
  }

  submit () {
    if (this.new) {
      this.api.createClient(this.client).subscribe(
        data => {
          if (data.success) {
            this.goToList();
          }
          else {
            console.log(data);
            
            this.notifications.show(data.msg);
          }
        }
      );
    }
    else {
      this.api.editClient(this.client).subscribe(
        data => {
          if (data.success) {
            this.notifications.show("Saved");
          
            this.stopEditing();
          
            this.makeBackup();
          }
          else {
            console.log(data);
            
            this.notifications.show(data.msg);
          }
        }
      );
    }
  }

  cancel() {
    this.stopEditing();

    this.restoreBackup();
  }

  cancelCreate() {
    this.goToList();
  }

  addContactPerson(){
    this.client.contactpersons.push(new ContactPerson());
  }

  removeContactPerson(i: number){
    this.client.contactpersons.splice(i, 1);
  }
}
