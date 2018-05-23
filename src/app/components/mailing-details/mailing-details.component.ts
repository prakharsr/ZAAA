import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MailingDetails } from 'app/models';

@Component({
  selector: 'app-mailing-details',
  templateUrl: './mailing-details.component.html',
  styleUrls: ['./mailing-details.component.css']
})
export class MailingDetailsComponent implements OnInit {

  details = new MailingDetails();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.details.to = this.data.to;
  }
}
