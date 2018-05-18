import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseOrder, Insertion, OtherCharges } from '../../release-order/release-order';
import { Invoice } from '../invoice';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NotificationService } from '../../services/notification.service';
import { InvoiceApiService } from '../invoice-api.service';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';
import { ReleaseOrderDir } from '../../release-order/release-order-dir-resolver.service';

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
  mediaHouse: MediaHouse;
  client: Client;
  executive: Executive;

  availableInsertions: AvailableInsertion[] = [];

  constructor(private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private api: InvoiceApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: ReleaseOrderDir }) => {
      this.releaseOrder = data.resolved.releaseorder;
      this.mediaHouse = data.resolved.mediaHouse;
      this.client = data.resolved.client;
      this.executive = data.resolved.executive;

      this.invoice.releaseOrderId = this.releaseOrder.id;
      this.invoice.adGrossAmount = this.releaseOrder.adGrossAmount;
      this.invoice.otherCharges = this.releaseOrder.otherCharges;
      this.invoice.publicationDiscount.amount = this.releaseOrder.publicationDiscount;
      this.invoice.agencyDiscount1.amount = this.releaseOrder.agencyDiscount1;
      this.invoice.taxAmount = this.releaseOrder.taxAmount;
      this.invoice.taxIncluded = this.releaseOrder.taxIncluded;

      this.invoice.taxType = this.mediaHouse.address.state == this.client.address.state ? 'SGST + CGST' : 'IGST';

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

    this.invoice.pendingAmount = this.invoice.FinalAmount;
    this.invoice.insertions = this.availableInsertions.filter(insertion => insertion.checked).map(insertion => insertion.insertion);

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

  otherChargesTypes = ['Designing Charges', 'Extra Copy/Newspaper Charges', 'Certificate Charges'];

  addCharges() {
    let item = new OtherCharges();
    item.chargeType = this.otherChargesTypes[0];

    this.invoice.otherCharges.push(item);
  }

}
