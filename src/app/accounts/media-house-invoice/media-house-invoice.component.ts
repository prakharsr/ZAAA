import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MediaHouseInvoiceDialogComponent } from '../media-house-invoice-dialog/media-house-invoice-dialog.component';
import { AccountsApiService } from '../accounts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, NotificationService } from 'app/services';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrderSearchParams, Insertion } from 'app/release-order';
import { MediaHouse, MediaHouseApiService } from 'app/directory';

import { PageData } from 'app/models';
import { MediaHouseInvoiceItem } from '../media-house-invoice-item';
import { MediaHouseInvoice } from '..';

@Component({
  selector: 'app-media-house-invoice',
  templateUrl: './media-house-invoice.component.html',
  styleUrls: ['./media-house-invoice.component.css']
})
export class MediaHouseInvoiceComponent implements OnInit {

  step = 0;

  page: number;
  pageCount: number;

  list: MediaHouseInvoiceItem[] = [];
  selectedRoId = "";

  insertionCheckList: { insertion: Insertion, checked: boolean }[] = [];

  pastDays = 0;
  
  mediaHouse;
  edition;

  constructor(private dialog: DialogService,
    private api: AccountsApiService,
    private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private mediaHouseApi: MediaHouseApiService,) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<MediaHouseInvoiceItem>, search: ReleaseOrderSearchParams } }) => {
      this.list = data.resolved.list.list;
      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;

      this.pastDays = data.resolved.search.past;
    });
  }

  show() {
    this.dialog.show(MediaHouseInvoiceDialogComponent)
      .subscribe((invoice: MediaHouseInvoice) => {
        invoice.insertions = this.insertionCheckList
          .filter(item => item.checked)
          .map(item => {
            return{
              ...item.insertion,
              insertionDate: this.toDate(item.insertion.date),
              Amount: 0,
              collectedAmount: 0,
              pendingAmount: 0,
            }
          });

        invoice.releaseOrderId = this.selectedRoId;

        this.api.createMediaHouseInvoice(invoice).subscribe(data => {
          if (data.success) {
            this.step = 0;
          }
          else {
            console.log(data);

            this.notifications.show(data.msg);
          }
        });
    });
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

  toDate(date: NgbDate) {
    return new Date(date.year, date.month - 1, date.day);
  }

  private get editionName() {
    if (this.edition instanceof String) {
      return this.edition;
    }

    return this.edition ? (this.edition.address ? this.edition.address.edition : null) : null;
  }

  search(pageNo: number) {
    this.router.navigate(['/accounts/mediahouseinvoice/list/', pageNo], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, null, null, null, this.pastDays)
    })
  }

  selectRO(i: number) {
    ++this.step;

    this.selectedRoId = this.list[i]._id;

    this.insertionCheckList = this.list[i].entries.map(entry => {
      let ins: any = entry.insertions;

      return {
        insertion: ins,
        checked: false
      }
    })
  }
}