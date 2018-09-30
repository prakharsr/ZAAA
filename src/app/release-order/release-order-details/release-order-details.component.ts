import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrder } from '../release-order';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { NotificationService, DialogService } from 'app/services';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { AccountsApiService } from 'app/accounts/accounts-api.service';

@Component({
  selector: 'app-release-order-details',
  templateUrl: './release-order-details.component.html',
  styleUrls: ['./release-order-details.component.css']
})
export class ReleaseOrderDetailsComponent implements OnInit {

  releaseOrder = new ReleaseOrder();

  invoices = [];
  notes = [];

  constructor(private api: ReleaseOrderApiService,
    private accountsApi: AccountsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private notifications: NotificationService,
    private dialog: DialogService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseOrder = data.releaseOrder;

      this.accountsApi.notesForRO(this.releaseOrder).subscribe(data => this.notes = data);

      this.api.getInvoices(this.releaseOrder).subscribe(data => this.invoices = data);
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  get taxDisplay() {
    // let tax = this.releaseOrder.taxAmount.primary + "%";

    // if (this.releaseOrder.taxAmount.secondary != 0) {
    //   tax += " + " + this.releaseOrder.taxAmount.secondary + "%"
    // }

    // return tax + (this.releaseOrder.taxIncluded ? " Tax Included" : " Tax Excluded");

    let tax = this.releaseOrder.taxAmount.primary;
    
    return tax ? `(Inclusive of ${this.releaseOrder.taxAmount.primary}% tax)` : '';
  }

  get isTypeWords() {

    if (this.releaseOrder.mediaType == 'Print' && this.releaseOrder.adType == 'Text Classified') {
      return true;
    }

    if (this.releaseOrder.mediaType == 'Electronic' && this.releaseOrder.adType == 'Scroll') {
      return true;
    }

    return false;
  }

  get isTypeLen() {

    if (this.releaseOrder.mediaType == 'Print' && this.releaseOrder.adType != 'Text Classified') {
      return true;
    }

    return false;
  }

  get isTypeTime() {

    if (this.releaseOrder.mediaType == 'Air') {
      return true;
    }

    if (this.releaseOrder.mediaType == 'Electronic' && this.releaseOrder.adType != 'Scroll') {
      return true;
    }

    return false;
  }

  get rateText() {
    if (this.isTypeLen) {
      return this.releaseOrder.fixRate ? "Rate per insertion" : "Rate per sqcm";
    }

    if (this.isTypeWords) {
      return "Rate per insertion";
    }

    if (this.isTypeTime) {
      return "Rate per sec";
    }
  }

  private confirmGeneration() : Observable<boolean> {
    if (this.releaseOrder.generated) {
      return of(true);
    }

    return this.dialog.showYesNo('Confirm Generation', "Release Order will be generated. Once generated it cannot be edited or deleted. Are you sure you want to continue?");
  }

  deleteReleaseOrder() {
    this.dialog.confirmDeletion("Are you sure you want to delete this Release Order?").subscribe(confirm => {
      if (!confirm)
        return;

      this.api.deleteReleaseOrder(this.releaseOrder).subscribe(
        data => {
          if (data.success) {
            // Go to list
            this.router.navigateByUrl('/releaseorders');
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        }
      );
    });
  }

  pdf() {
    this.confirmGeneration().subscribe(confirm => {
      if (confirm) {
        this.api.generatePdf(this.releaseOrder).subscribe(data => {
          if (data.msg) {
            this.notifications.show(data.msg);
          }
          else {
            this.releaseOrder.generated = true;

            console.log(data);
            
            let blob = new Blob([data], { type: 'application/pdf' });
            let url = URL.createObjectURL(blob);
    
            let a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = 'releaseorder.pdf';
            a.href = url;
            a.click();
          }
        });
      }
    })
  }

  sendMsg() {
    this.confirmGeneration().subscribe(confirm => {
      if (confirm) {
        this.dialog.getMailingDetails().subscribe(mailingDetails => {
          if (mailingDetails) {
            this.api.sendMail(this.releaseOrder, mailingDetails).subscribe(data => {
              if (data.success) {
                this.notifications.show("Sent Successfully");

                this.releaseOrder.generated = true;
              }
              else {
                console.log(data);

                this.notifications.show(data.msg);
              }
            });
          }
        });
      }
    });
  }

  get canCreateInvoice() {
    return this.releaseOrder.insertions.some(insertion => !insertion.marked);
  }

  generate() {
    this.api.generate(this.releaseOrder).subscribe(data => {
      if (data.success) {
        this.notifications.show('Generated');
        this.releaseOrder.generated = true;
      }
      else {
        this.notifications.show('Failed to Generate');
      }
    });
  }

  get canCancel() {
    return this.releaseOrder.insertions.every(insertion => !insertion.marked && !insertion.mhimarked);
  }

  cancel() {
    this.dialog.showYesNo("Confirm Cancellation", "Do you want to cancel this Release Order? This cannot be undone. If any Media House Invoice or Invoice has been created for this Release Order, it can not be cancelled.").subscribe(confirm => {
      if (confirm) {
        this.api.cancel(this.releaseOrder).subscribe(data => {
          if (!data.success) {
            this.notifications.show(data.msg);
          }
        });
      }
    });
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
