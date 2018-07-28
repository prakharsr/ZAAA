import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  list: Ticket[] = [];
  page = 0;
  pageCount = 0;

  constructor(private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.page = Number(params.get('page'));

      this.api.queryTickets(1, 0).subscribe(data => {
        this.list = data.list;
        this.pageCount = data.pageCount;
      });
    });
  }

  navigate(i: number) {
    this.router.navigate(['/tickets/list', i]);
  }

}
