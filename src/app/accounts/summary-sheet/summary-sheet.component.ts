import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MediaHouseApiService, MediaHouse } from 'app/directory';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from 'app/models';
import { InsertionCheckItem, ReleaseOrderSearchParams } from 'app/release-order';
import { AccountsApiService, SummarySheetInsertion } from '../accounts-api.service';
import { NotificationService } from 'app/services';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { MediaHouseInvoiceItem } from '../media-house-invoice-item';

class InsertionWithAmount extends InsertionCheckItem {
  amount = 0;
  receiptNo = "";
  receiptDate = new Date();
  paymentMode = "Cash";
}

@Component({
  selector: 'app-summary-sheet',
  templateUrl: './summary-sheet.component.html',
  styleUrls: ['./summary-sheet.component.css']
})
export class SummarySheetComponent implements OnInit {

  page: number;
  pageCount: number;

  insertions: InsertionWithAmount[] = [];

  mediaHouse;
  edition;

  paymentTypes = ['Cash', 'Credit', 'Cheque', 'NEFT'];

  constructor(private mediaHouseApi: MediaHouseApiService,
    private route: ActivatedRoute,
    private router: Router,
    private api: AccountsApiService,
    private notifications: NotificationService) { }

  ngOnInit() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    this.route.data.subscribe((data: { resolved: { list: PageData<MediaHouseInvoiceItem>, search: ReleaseOrderSearchParams }}) => {
      data.resolved.list.list.forEach(element => {
        element.entries.forEach(entry => {
          this.insertions.push({
            _id: element._id,
            clientName: entry.clientName,
            checked: entry.checked,
            executiveName: entry.executiveName,
            executiveOrg: entry.executiveOrg,
            publicationEdition: entry.publicationEdition,
            publicationName: entry.publicationName,
            insertions: entry.insertions,
            amount: 0,
            receiptNo: "",
            receiptDate: today,
            paymentMode: "Cash"
          });
        });
      });
      
      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;
    });
  }

  search(pageNo: number) {
    this.router.navigate(['/accounts/summarysheet/', pageNo], {
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
    let mapped: SummarySheetInsertion[] = this.insertions.map(insertion => {
      return {
        _id: insertion.insertions._id,
        amount: insertion.amount,
        recieptNumber: insertion.receiptNo,
        recieptDate: insertion.receiptDate,
        paymentMode: insertion.paymentMode
      }
    });

    this.api.generateSummarySheet(mapped).subscribe(data => {
      if (data.success) {
        this.notifications.show('Success');
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }
}
