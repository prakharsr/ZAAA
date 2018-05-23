import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Insertion, ReleaseOrder, OtherCharges, TaxValues } from '@aaman/releaseorder/release-order';
import { Invoice } from '../invoice';
import { MediaHouse, Client, Executive } from 'app/directory';
import { NotificationService } from '@aaman/main/notification.service';
import { InvoiceApiService } from '../invoice-api.service';
import { OptionsService } from '@aaman/main/options.service';
import { ReleaseOrderDir } from '@aaman/releaseorder/release-order-dir-resolver.service';

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
    public options: OptionsService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: ReleaseOrderDir }) => {
      this.releaseOrder = data.resolved.releaseorder;
      this.mediaHouse = data.resolved.mediaHouse;
      this.client = data.resolved.client;
      this.executive = data.resolved.executive;

      this.invoice.releaseOrderId = this.releaseOrder.id;
      this.invoice.otherCharges = this.releaseOrder.otherCharges;
      this.invoice.publicationDiscount.amount = this.releaseOrder.publicationDiscount;
      this.invoice.agencyDiscount1.amount = this.releaseOrder.agencyDiscount1;

      this.taxes.forEach(element => {
        if (element.primary == this.releaseOrder.taxAmount.primary && element.secondary == this.releaseOrder.taxAmount.secondary) {
          this.invoice.taxAmount = element;
        }
      });
      
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
    
    this.invoice.adGrossAmount = this.grossAmount;
    this.invoice.netAmountFigures = this.netAmount;
    this.invoice.netAmountWords = this.options.amountToWords(this.invoice.netAmountFigures);
    this.invoice.pendingAmount = this.invoice.netAmountFigures;
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

  get toPay() {
    let adCountPaid = (+this.releaseOrder.adTotal * +this.releaseOrder.adSchemePaid) / (+this.releaseOrder.adSchemePaid + +this.releaseOrder.adSchemeFree);

    if (adCountPaid == this.releaseOrder.insertions.length) {
      return this.insertionCount;
    }

    let marked = this.releaseOrder.insertions.filter(insertion => insertion.marked).length;  

    if (marked >= adCountPaid) {
      return 0;
    }

    let residue = marked + this.insertionCount - adCountPaid;

    if (residue >= 0) {
      return this.insertionCount - residue;
    }
    else return this.insertionCount;
  }

  get grossAmount() {
    let grossSingle = this.releaseOrder.adGrossAmount / this.releaseOrder.adSchemePaid;
    return Math.ceil(grossSingle * this.toPay);
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
    let amount = 0;
    let finalAmount = this.netAmount;

    amount += (this.invoice.taxAmount.primary * finalAmount) / 100;
    amount += (this.invoice.taxAmount.secondary * finalAmount) / 100;

    return amount;
  }

  removeOtherCharge(i: number) {
    this.invoice.otherCharges.splice(i, 1);
  }

}
