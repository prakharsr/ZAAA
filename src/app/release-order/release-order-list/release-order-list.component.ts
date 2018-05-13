import { Component, OnInit } from '@angular/core';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { DialogService } from '../../services/dialog.service';
import { ReleaseOrder } from '../release-order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MailingDetails } from '../../models/mailing-details';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ReleaseOrderPage } from '../release-order-page';

@Component({
  selector: 'app-release-order-list',
  templateUrl: './release-order-list.component.html',
  styleUrls: ['./release-order-list.component.css']
})
export class ReleaseOrderListComponent implements OnInit {

  releaseOrders = [];

  displayedColumns = ['data', 'action'];
  dataSource = new MatTableDataSource();

  pageCount: number;
  page: number;

  dummyArray;

  constructor(private api: ReleaseOrderApiService,
    private dialog: DialogService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { list: ReleaseOrderPage }) => {
      this.releaseOrders = data.list.releaseOrders;

      this.dataSource.data = this.releaseOrders;

      this.pageCount = data.list.pageCount;
      this.page = data.list.page;

      this.dummyArray = Array(this.pageCount);
    });
  }

  deleteReleaseOrder(releaseOrder: ReleaseOrder) {
    this.dialog.confirmDeletion("Are you sure you want to delete this Release Order?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteReleaseOrder(releaseOrder).subscribe(
        data => {
          if (data.success) {
            this.dataSource.data = this.releaseOrders = this.releaseOrders.filter(c => c.id !== releaseOrder.id);
          }
          else {
            console.log(data);
          }
        },
        err => console.log(err)
      );
    });
  }

  sendMsg() {
    this.dialog.getMailingDetails().subscribe(mailingDetails => {
      if (mailingDetails) {
        console.log(mailingDetails);
      }
    });
  }

  mailingDetails(mailingDetails: MailingDetails) {}

}
