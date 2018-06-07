import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { MailingDetails } from 'app/models';

// Import individually to prevent circular dependency
import { DialogComponent } from '../components/dialog/dialog.component';
import { MailingDetailsComponent } from '../components/mailing-details/mailing-details.component';
import { BillingDetails, BillingDetailsComponent } from '../components/billing-details/billing-details.component';
import { CategoriesDetails, CategoriesDetailsComponent } from '../release-order/categories-details/categories-details.component';
import { InsertionDetails, InsertionDetailsComponent } from '../release-order/insertion-details/insertion-details.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDeletion(msg: string) : Observable<boolean> {
    return this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: msg,
        ok: true,
        cancel: true
      }
    }).afterClosed();
  }

  showYesNo(title: string, msg: string) : Observable<boolean> {
    return this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: msg,
        yes: true,
        no: true
      }
    }).afterClosed();
  }

  getMailingDetails(to?: string) : Observable<MailingDetails> {
    return this.dialog.open(MailingDetailsComponent, {
      width: '400px',
      data: {
        to: to
      }
    }).afterClosed();
  }

  getBillingDetails() : Observable<BillingDetails> {
    return this.dialog.open(BillingDetailsComponent, {
      disableClose: true
    }).afterClosed();
  }

  getCategoriesDetails() : Observable<CategoriesDetails> {
    return this.dialog.open(CategoriesDetailsComponent, {
      disableClose: true
    }).afterClosed();
  }

  getInsertionDetails() : Observable<InsertionDetails> {
    return this.dialog.open(InsertionDetailsComponent, {
      disableClose: true
    }).afterClosed();
  }

  show<T>(component: any, config?: { data?: any, width?: string, height?: string }) : Observable<T> {
    return this.dialog.open(component, config).afterClosed();
  }
}
