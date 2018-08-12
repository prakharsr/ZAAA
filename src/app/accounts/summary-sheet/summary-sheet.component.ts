import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MediaHouseApiService, MediaHouse } from 'app/directory';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseOrderSearchParams } from 'app/release-order';
import { AccountsApiService, SummarySheetInsertion, SummarySheetResponse } from '../accounts-api.service';
import { NotificationService, DialogService } from 'app/services';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { PaymentDetailsDialogComponent, PaymentDetails } from '../payment-details-dialog/payment-details-dialog.component';

@Component({
  selector: 'app-summary-sheet',
  templateUrl: './summary-sheet.component.html',
  styleUrls: ['./summary-sheet.component.css']
})
export class SummarySheetComponent implements OnInit {

  summarySheet: SummarySheetResponse[] = [];

  mediaHouse;
  edition;

  constructor(private mediaHouseApi: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router,
    private api: AccountsApiService,
    private notifications: NotificationService,
    private dialog: DialogService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: SummarySheetResponse[], search: ReleaseOrderSearchParams }}) => {
      this.summarySheet = data.resolved.list;

      if (this.summarySheet.entries) {
        this.summarySheet.forEach(item => {
          item.entries.forEach(entry => {
            entry.SheetAmount = 0; // This will be filled here
            entry.checked = false;
          });
        });
      }

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;
    });
  }

  search() {
    this.router.navigate(['/accounts/summarysheet/'], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, null, null, null, 0)
    })
  }

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  private get mediaHouseName() {
    if (this.mediaHouse instanceof String) {
      return this.mediaHouse;
    }

    return this.mediaHouse ? this.mediaHouse.pubName : null;
  }

  searchEdition = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHousesByEdition(term, this.mediaHouseName))
      .catch(() => of([]));
  }

  editionFormatter = (mediaHouse: MediaHouse) => mediaHouse.address.edition;

  mediaHouseNameFormatter = (mediaHouse: MediaHouse) => {
    this.edition = mediaHouse;

    return mediaHouse.pubName;
  }

  private get editionName() {
    if (this.edition instanceof String) {
      return this.edition;
    }

    return this.edition ? (this.edition.address ? this.edition.address.edition : null) : null;
  }

  submit() {
    let mapped: SummarySheetInsertion[] = [];

    this.summarySheet.forEach(item => {
      item.entries.filter(entry => entry.checked).forEach(entry => {
        mapped.push({
          _id: entry._id,
          amount: entry.SheetAmount
        });
      })
    });

    if (mapped.length == 0) {
      this.notifications.show('Nothing to submit');

      return;
    }

    this.dialog.show(PaymentDetailsDialogComponent, { width: '400px' }).subscribe((data: PaymentDetails) => {
      if (data) {
        this.api.generateSummarySheet(data, mapped).subscribe(data => {
          if (data.success) {
            this.notifications.show('Success');
          }
          else {
            console.log(data);
    
            this.notifications.show(data.msg);
          }
        });
      }
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }
}
