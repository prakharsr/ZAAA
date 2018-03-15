import { Component, OnInit } from '@angular/core';
import { DirClient, ContactPerson } from '../dirClient';
import { ClientApiService } from '../client-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StateApiService } from '../../../services/state-api.service';

@Component({
  selector: 'app-dir-client',
  templateUrl: './dir-client.component.html',
  styleUrls: ['./dir-client.component.css']
})
export class DirClientComponent implements OnInit {

  client = new DirClient();
  error: string;

  id: string;

  edit = false;

  constructor(private api: ClientApiService,
    private route: ActivatedRoute,
    private router: Router,
    public stateApi: StateApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.api.getClient(this.id).subscribe(data => this.client = data);
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
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
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
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    )
  }

  submit () {
    this.error = '';

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
