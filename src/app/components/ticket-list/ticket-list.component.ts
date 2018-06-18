import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  res = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.res = this.api.queryTickets(1, 0);
  }

}
