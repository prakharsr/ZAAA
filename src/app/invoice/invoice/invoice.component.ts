import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
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
import { PreviewComponent } from 'app/components/preview/preview.component';
import { of } from 'rxjs/observable/of';
import { Firm } from 'app/models';

class AvailableInsertion {
  constructor(public insertion: Insertion, public checked = false) { }
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // Dummy variable
  submitted = false;

  invoice = new Invoice();
  releaseOrder: ReleaseOrder;
  mediaHouse: MediaHouse;
  client: Client;
  executive: Executive;

  creditDays = 0;

  submitting = false;

  availableInsertions: AvailableInsertion[] = [];
  markedInsertions: Date[] = [];

  constructor(private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private api: InvoiceApiService,
    public options: OptionsService,
    private dialog: DialogService,
    private roApi: ReleaseOrderApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: ReleaseOrderDir, firm: Firm }) => {
      if (data.resolved) {
        this.init(data.resolved);
      }

      switch (data.firm.GSTIN.GSTType) {
        case 'URD':
        case 'CRD':
          this.invoice.taxAmount = this.taxes[0];
          break;
        
        default:
          this.invoice.taxAmount = this.taxes[1];
          break;
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
    // this.invoice.publicationDiscount.amount = this.releaseOrder.publicationDiscount;
    // this.invoice.agencyDiscount1.amount = this.releaseOrder.agencyDiscount1;

    this.invoice.GSTIN = this.client.GSTIN;

    // this.taxes.forEach(element => {
    //   if (element.primary == this.releaseOrder.taxAmount.primary && element.secondary == this.releaseOrder.taxAmount.secondary) {
    //     this.invoice.taxAmount = element;
    //   }
    // });
    
    // this.invoice.taxIncluded = this.releaseOrder.taxIncluded;

    this.invoice.taxType = this.mediaHouse.address.state == this.client.address.state ? 'SGST + CGST' : 'IGST';

    this.availableInsertions = [];
    
    this.releaseOrder.insertions.forEach(element => {
      if (!element.marked) {
        this.availableInsertions.push(new AvailableInsertion(element));
      }
      else this.markedInsertions.push(this.toDate(element.date));
    });
  }

  save() {
    this.submit().subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else this.submitting = false;
    });
  }

  saveAndGen() {
    this.confirmGeneration().subscribe(confirm=> {
      if(confirm) {
        this.submit().subscribe(data => {
          if (data.success) {
            this.gen(this.invoice);
          }
          else this.submitting = false;
        });
      }
    });
  }

  saveAndSendMsg() {
    this.confirmGeneration().subscribe(confirm => {
      if(confirm) {
        this.submit().subscribe(data => {
          if (data.success) {
            this.sendMsg(this.invoice);
          }
          else this.submitting = false;
        });
      }
    });
  }

  genPreview() {
    if (!this.presave()) {
      return;
    }

    this.api.previewInvoicehtml(this.invoice).subscribe(data => {
      this.dialog.show(PreviewComponent, { data: data.content }).subscribe(response => {
        switch (response) {
          case 'save':
            this.save();
            break;

          case 'dl':
            this.saveAndGen();
            break;

          case 'mail':
            this.saveAndSendMsg();
            break;
        }
      });
    });
  }

  private confirmGeneration() : Observable<boolean> {

    return this.dialog.showYesNo('Confirm Generation', "Invoice will be generated. Once generated it cannot be edited or deleted. Are you sure you want to continue?");
  }

  gen(invoice: Invoice, preview = false) {
    this.api.generate(invoice).subscribe(data => {
      if (data.msg) {
        this.notifications.show(data.msg);
      }
      else {
        console.log(data);
        
        let blob = new Blob([data], { type: 'application/pdf' });
        let url = URL.createObjectURL(blob);

        let a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        if (preview) {
          a.setAttribute("target", "_blank");
        }
        else {
          a.download = 'invoice.pdf';
        }
        a.click();
      }
    });
  }

  sendMsg(invoice: Invoice) {
    this.dialog.getMailingDetails().subscribe(mailingDetails => {
      if (mailingDetails) {
        this.api.sendMail(invoice, mailingDetails).subscribe(data => {
          if (data.success) {
            this.notifications.show("Sent Successfully");
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        });
      }
    });
  }

  get roDiscountedAmount() {
    let amount = this.releaseOrder.adGrossAmount;

    amount -= (this.releaseOrder.agencyDiscount1 * amount) / 100;
    amount -= (this.releaseOrder.agencyDiscount2 * amount) / 100;

    amount -= (this.releaseOrder.publicationDiscount * amount) / 100;

    return amount;
  }

  get finalRoAmount() {
    let amount = this.roDiscountedAmount;

    amount += this.finalRoTaxAmount;

    return amount;
  }

  get finalRoTaxAmount() {
    let taxAmount = 0;

    taxAmount += (this.releaseOrder.taxAmount.primary * this.roDiscountedAmount) / 100;
    taxAmount += (this.releaseOrder.taxAmount.secondary * taxAmount) / 100;

    return taxAmount;
  }

  get roDiscountDisplay() {
    let tax = this.releaseOrder.agencyDiscount1 + "%";

    if (this.releaseOrder.agencyDiscount2 != 0) {
      tax += " + " + this.releaseOrder.agencyDiscount2 + "%"
    }

    return tax;
  }

  get pubDiscountDisplay() {
    return this.releaseOrder.publicationDiscount + "%";
  }

  get roTaxDisplay() {
    let tax = this.releaseOrder.taxAmount.primary + "%";

    if (this.releaseOrder.taxAmount.secondary != 0) {
      tax += " + " + this.releaseOrder.taxAmount.secondary + "%"
    }

    return tax;
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  private goBack() {
    this.router.navigateByUrl('/invoices');
  }

  presave(): boolean {
    if (!this.availableInsertions.some(val => val.checked)) {
      this.notifications.show('No Insertions selected');

      return false;
    }
    
    this.invoice.adGrossAmount = this.grossAmount;
    this.invoice.netAmountFigures = this.netAmount;
    this.invoice.netAmountWords = this.options.amountToWords(this.invoice.netAmountFigures);
    this.invoice.FinalTaxAmount = this.finalTaxAmount;
    this.invoice.FinalAmount = this.finalAmount;
    this.invoice.insertions = this.availableInsertions.filter(insertion => insertion.checked).map(insertion => insertion.insertion);
    this.invoice.paymentDate = new Date();
    this.invoice.paymentDate.setDate(this.invoice.paymentDate.getDate() + this.creditDays);

    return true;
  }

  submit() : Observable<any> {
    
    this.submitting = true;

    if (this.presave()) {
      return this.createInvoice();
    }
    else return of({});
  }

  private createInvoice() {
    return this.api.createInvoice(this.invoice).pipe(
      map(data => {
        if (data.success) {
          this.invoice.id = data.msg;
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }

        return data;
      })
    );
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
    new TaxValues(0),
    new TaxValues(5),
    new TaxValues(18)
  ];

  get insertionCount() {
    return this.availableInsertions.filter(insertion => insertion.checked).length;
  }

  get insertionAmount() {
    let grossSingle = this.releaseOrder.adGrossAmount / this.releaseOrder.insertions.length;
    return Math.ceil(grossSingle * this.insertionCount);
  }

  get grossAmount() {
    let result = this.insertionAmount;

    if (this.invoice.additionalCharges.percentage) {
      result += +(result * this.invoice.additionalCharges.amount) / 100;
    }
    else result += +this.invoice.additionalCharges.amount;

    if (this.invoice.extraCharges.percentage) {
      result += +(result * this.invoice.extraCharges.amount) / 100;
    }
    else result += +this.invoice.extraCharges.amount;

    return result;
  }

  get netAmount() {
    let result = this.grossAmount;    

    if (this.invoice.publicationDiscount.percentage) {
      result -= +(result * this.invoice.publicationDiscount.amount) / 100;
    }
    else result -= this.invoice.publicationDiscount.amount
    
    if (this.invoice.agencyDiscount1.percentage) {
      result -= (result * this.invoice.agencyDiscount1.amount) / 100;
    }
    else result -= this.invoice.agencyDiscount1.amount;

    this.invoice.otherCharges.forEach(otherCharge => result += +otherCharge.amount);

    return Math.ceil(result);
  }

  get finalTaxAmount() {
    let taxAmount = this.netAmount;

    taxAmount += (this.invoice.taxAmount.primary * taxAmount) / 100;
    taxAmount += (this.invoice.taxAmount.secondary * taxAmount) / 100;

    return taxAmount;
  }

  get finalAmount() {
    return this.finalTaxAmount;
  }

  removeOtherCharge(i: number) {
    this.invoice.otherCharges.splice(i, 1);
  }

  selectRO() {
    this.dialog.show(SelectReleaseOrderComponent).subscribe((data: ReleaseOrder) => {
      if (data) {
        this.roApi.getReleaseOrderDir(data.id).subscribe(dir => {
          this.init(dir);
        });
      }
    });
  }

  selectAllInsertions() {
    this.availableInsertions.forEach(insertion => insertion.checked = true);
  }
  
  handleSubmit(valid: boolean, callbackName: string) {
    if (valid) {
      switch (callbackName) {
        case 'save':
          this.save();
          break;
        
        case 'dl':
          this.saveAndGen();
          break;
        
        case 'preview':
          this.genPreview();
          break;

        case 'mail':
          this.saveAndSendMsg();
          break;
      }
    }
    else this.notifications.show('Fix errors before submitting');
  }

  getInsertionStateText(state: number) {
    switch (state) {
      case 1:
        return 'Not Published';

      case 2:
        return 'Published';

      case 3:
        return 'Disputed';
    }
  }
}
