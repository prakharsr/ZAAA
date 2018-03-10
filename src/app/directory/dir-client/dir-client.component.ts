import { Component, OnInit } from '@angular/core';
import { DirClient } from '../dirClient';
import { DirApiService } from '../dir-api.service';

@Component({
  selector: 'app-dir-client',
  templateUrl: './dir-client.component.html',
  styleUrls: ['./dir-client.component.css']
})
export class DirClientComponent implements OnInit {

  client = new DirClient();
  error: string;
  success: string;

  constructor(private api: DirApiService) { }

  ngOnInit() {
  }

  submit () {
    this.error = '';
    this.success = '';

    this.api.createClient(this.client).subscribe(
      data => {
        if (data.success) {
          this.success = 'Client created successfully';
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

}
