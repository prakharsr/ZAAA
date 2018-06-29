import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Invoice } from '../invoice';
import { MediaHouse, Client, Executive } from 'app/directory';
import { NotificationService, OptionsService, DialogService } from 'app/services';
import { InvoiceApiService } from '../invoice-api.service';

import {
  Insertion,
  ReleaseOrder,
  OtherCharges,
  TaxValues,
  ReleaseOrderDir,
  ReleaseOrderApiService
} from 'app/release-order';
import { SelectReleaseOrderComponent } from '../select-release-order/select-release-order.component';

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
    private api: InvoiceApiService,
    public options: OptionsService,
    private dialog: DialogService,
    private roApi: ReleaseOrderApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: ReleaseOrderDir }) => {
      if (data.resolved) {
        this.init(data.resolved);
      }
    });
  }

  init(resolved: ReleaseOrderDir) {
    this.releaseOrder = resolved.releaseorder;
    this.mediaHouse = resolved.mediaHouse;
    this.client = resolved.client;
    this.executive = resolved.executive;

    this.invoice.releaseOrderId = this.releaseOrder.id;
    this.invoice.otherCharges = this.releaseOrder.otherCharges;
    this.invoice.publicationDiscount.amount = this.releaseOrder.publicationDiscount;
    this.invoice.agencyDiscount1.amount = this.releaseOrder.agencyDiscount1;

    this.invoice.GSTIN = this.client.GSTIN;

    this.taxes.forEach(element => {
      if (element.primary == this.releaseOrder.taxAmount.primary && element.secondary == this.releaseOrder.taxAmount.secondary) {
        this.invoice.taxAmount = element;
      }
    });
    
    this.invoice.taxIncluded = this.releaseOrder.taxIncluded;

    this.invoice.taxType = this.mediaHouse.address.state == this.client.address.state ? 'SGST + CGST' : 'IGST';

    this.releaseOrder.insertions.forEach(element => {
      this.availableInsertions = [];

      if (!element.marked) {
        this.availableInsertions.push(new AvailableInsertion(element));
      }
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
    
    this.invoice.adGrossAmount = this.grossAmount;
    this.invoice.netAmountFigures = this.netAmount;
    this.invoice.netAmountWords = this.options.amountToWords(this.invoice.netAmountFigures);
    this.invoice.pendingAmount = this.invoice.netAmountFigures;
    this.invoice.FinalTaxAmount = this.finalTaxAmount;
    this.invoice.insertions = this.availableInsertions.filter(insertion => insertion.checked).map(insertion => insertion.insertion);

    this.api.createInvoice(this.invoice).subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
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

  taxes: TaxValues[] = [
    new TaxValues(5),
    new TaxValues(10),
    new TaxValues(14),
    new TaxValues(28, 18)
  ];

  get insertionCount() {
    return this.availableInsertions.filter(insertion => insertion.checked).length;
  }

  get grossAmount() {
    let grossSingle = this.releaseOrder.adGrossAmount / this.releaseOrder.insertions.length;
    return Math.ceil(grossSingle * this.insertionCount);
  }

  get netAmount() {
    let result = this.grossAmount;

    this.invoice.otherCharges.forEach(otherCharge => result += +otherCharge.amount);

    if (this.invoice.additionalCharges.percentage) {
      result += +(result * this.invoice.additionalCharges.amount) / 100;
    }
    else result += +this.invoice.additionalCharges.amount;

    if (this.invoice.extraCharges.percentage) {
      result += +(result * this.invoice.extraCharges.amount) / 100;
    }
    else result += +this.invoice.extraCharges.amount;

    if (this.invoice.publicationDiscount.percentage) {
      result -= +(result * this.invoice.publicationDiscount.amount) / 100;
    }
    else result -= this.invoice.publicationDiscount.amount
    
    if (this.invoice.agencyDiscount1.percentage) {
      result -= (result * this.invoice.agencyDiscount1.amount) / 100;
    }
    else result -= this.invoice.agencyDiscount1.amount;

    return Math.ceil(result);
  }

  get finalTaxAmount() {
    let taxAmount = this.netAmount;

    taxAmount += (this.invoice.taxAmount.primary * taxAmount) / 100;
    taxAmount += (this.invoice.taxAmount.secondary * taxAmount) / 100;

    return taxAmount;
  }

  removeOtherCharge(i: number) {
    this.invoice.otherCharges.splice(i, 1);
  }

  selectRO() {
    this.dialog.show(SelectReleaseOrderComponent).subscribe((data: ReleaseOrder) => {
      if (data) {
        this.releaseOrder = data;

        this.roApi.getReleaseOrderDir(this.releaseOrder.id).subscribe(dir => {
          this.client = dir.client;
          this.mediaHouse = dir.mediaHouse;
          this.executive = dir.executive;
        });
      }
    });
  }
}
