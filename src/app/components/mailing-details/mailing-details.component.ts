import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MailingDetails } from '../../models/mailing-details';

@Component({
  selector: 'app-mailing-details',
  templateUrl: './mailing-details.component.html',
  styleUrls: ['./mailing-details.component.css']
})
export class MailingDetailsComponent implements OnInit {

  details = new MailingDetails();

  @Output() done = new EventEmitter<MailingDetails>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.done.emit(this.details);
  }

}
