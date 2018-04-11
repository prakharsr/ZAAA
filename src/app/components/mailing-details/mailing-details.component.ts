import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MailingDetails } from '../../models/mailing-details';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mailing-details',
  templateUrl: './mailing-details.component.html',
  styleUrls: ['./mailing-details.component.css']
})
export class MailingDetailsComponent implements OnInit {

  details = new MailingDetails();

  @Output() done = new EventEmitter<MailingDetails>();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.details.to = this.data.to;
  }

  submit() {
    this.done.emit(this.details);
  }

}
