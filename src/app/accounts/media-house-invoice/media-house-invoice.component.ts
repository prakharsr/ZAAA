import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MediaHouseInvoiceDialogComponent } from '../media-house-invoice-dialog/media-house-invoice-dialog.component';
import { AccountsApiService } from '../accounts-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, NotificationService } from 'app/services';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrderSearchParams, Insertion } from 'app/release-order';

import {
  MediaHouse,
  Executive,
  Client,
  MediaHouseApiService,
  ExecutiveApiService,
  ClientApiService
} from 'app/directory';

import { PageData } from 'app/models';
import { MediaHouseInvoiceItem } from '../media-house-invoice-item';

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

  insertionCheckList: { insertion: Insertion, checked: boolean }[] = [];

  pastDays = 0;
  
  mediaHouse;
  edition;
  client;
  executive;
  executiveOrg;

  constructor(private dialog: DialogService,
    private api: AccountsApiService,
    private route: ActivatedRoute,
    private notifications: NotificationService,
    private router: Router,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<MediaHouseInvoiceItem>, search: ReleaseOrderSearchParams } }) => {
      this.list = data.resolved.list.list;
      this.page = data.resolved.list.page;
      this.pageCount = data.resolved.list.pageCount;

      let pub = new MediaHouse();
      pub.pubName = data.resolved.search.mediaHouse;
      pub.address.edition = data.resolved.search.edition;

      this.mediaHouse = this.edition = pub;
     
      let cl = new Client();
      cl.orgName = data.resolved.search.client;

      this.client = cl;

      let exe = new Executive();
      exe.executiveName = data.resolved.search.executive;
      exe.orgName = data.resolved.search.executiveOrg;

      this.executive = this.executiveOrg = exe;

      this.pastDays = data.resolved.search.past;
    });
  }

  show() {
    this.dialog.show(MediaHouseInvoiceDialogComponent);
  }
  
  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientNameFormatter = (client: Client) => client.orgName;
  
  searchExecutive = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutives(term))
      .catch(() => of([]));
  }

  private get executiveName() {
    if (this.executive instanceof String) {
      return this.executive;
    }
      
    return this.executive ? this.executive.executiveName : null;
  }

  searchExecutiveOrg = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutivesByOrg(this.executiveName, term))
      .catch(() => of([]));
  }

  executiveNameFormatter = (executive: Executive) => {
    this.executiveOrg = executive;

    return executive.executiveName;
  }
  
  executiveOrgFormatter = (executive: Executive) => executive.orgName;

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

  private get clientName() {
    if (this.client instanceof String) {
      return this.client;
    }

    return this.client ? this.client.orgName : null;
  }

  private get exeOrg() {
    if (this.executiveOrg instanceof String) {
      return this.executiveOrg;
    }

    return this.executiveOrg ? this.executiveOrg.orgName : null;
  }

  search(pageNo: number) {
    this.router.navigate(['/releaseorders/check/list/', pageNo], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, this.clientName, this.executiveName, this.exeOrg, this.pastDays)
    })
  }

  selectRO(i: number) {
    ++this.step;

    this.insertionCheckList = this.list[i].entries.map(entry => {
      let ins: any = entry.insertions;

      return {
        insertion: ins,
        checked: false
      }
    })
  }
}