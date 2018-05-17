import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseOrder, Insertion } from '../../release-order/release-order';
import { Invoice } from '../invoice';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NotificationService } from '../../services/notification.service';
import { InvoiceApiService } from '../invoice-api.service';

class AvailableInsertion {
  constructor(public insertion: Insertion, public checked = false) { }
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoice = new Invoice();
  releaseOrder: ReleaseOrder;

  availableInsertions: AvailableInsertion[] = [];

  constructor(private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private api: InvoiceApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseOrder = data.releaseOrder;

      this.invoice.releaseOrderId = data.releaseOrder.id;

      this.releaseOrder.insertions.forEach(element => {
        if (!element.marked) {
          this.availableInsertions.push(new AvailableInsertion(element));
        }
      });
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  private goBack() {
    this.router.navigateByUrl('/invoices');
  }

  submit() {
    if (!this.availableInsertions.some(val => val.checked)) {
      this.notifications.show('No Insertions selected');

      return;
    }

    this.api.createInvoice(this.invoice).subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }

  cancel() {
    this.goBack();
  }

}
