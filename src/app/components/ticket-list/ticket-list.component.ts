import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from 'app/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models';
import { SuperAdminApiService } from '../../super-admin/super-admin-api.service';
import { Observable } from '../../../../node_modules/rxjs/Observable';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  list: Ticket[] = [];
  page = 0;
  pageCount = 0;

  isSuperAdmin = false;
  status = 0;

  constructor(private api: ApiService,
    private superAdminApi: SuperAdminApiService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { superAdmin: boolean, status: number }) => {
      this.isSuperAdmin = data.superAdmin;
      this.status = data.status;

      this.route.paramMap.subscribe(params => {
        this.page = Number(params.get('page'));
  
        let base: Observable<any>;

        if (this.isSuperAdmin) {
          base = this.superAdminApi.queryTickets(this.page, 0, this.status);
        }
        else base = this.api.queryTickets(this.page, 0);

        base.subscribe(data => {
          this.list = data.list;
          this.pageCount = data.pageCount;
        });
      });
    });
  }

  navigate(i: number) {
    this.router.navigate(['/tickets/list', i]);
  }

  changeStatus(ticket: Ticket, status: number) {
    this.superAdminApi.ticketStatus(ticket, status).subscribe(data => {
      if (!data.success) {
        console.log(data);

        this.notification.show(data.msg);
      }
    });
  }
}
