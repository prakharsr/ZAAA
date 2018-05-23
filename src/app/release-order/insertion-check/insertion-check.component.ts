import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { MatTableDataSource } from '@angular/material';
import { InsertionCheckItem } from '@aaman/releaseorder/insertion-check-item';
import { DialogService } from '@aaman/main/dialog.service';
import { ReleaseOrderApiService } from '@aaman/releaseorder/release-order-api.service';
import { NotificationService } from '@aaman/main/notification.service';
import { PageData } from '@aaman/main/page-data';
import { ReleaseOrderSearchParams } from '@aaman/releaseorder/release-order-search-params';

import {
  Client,
  MediaHouse,
  Executive,
  ClientApiService,
  MediaHouseApiService,
  ExecutiveApiService
} from 'app/directory';

@Component({
  selector: 'app-insertion-check',
  templateUrl: './insertion-check.component.html',
  styleUrls: ['./insertion-check.component.css']
})
export class InsertionCheckComponent implements OnInit {

  insertions: InsertionCheckItem[] = [];

  page: number;
  pageCount: number;

  pastDays = 0;
  
  mediaHouse;
  edition;
  client;
  executive;
  executiveOrg;

  constructor(private dialog: DialogService,
    private route: ActivatedRoute,
    private api: ReleaseOrderApiService,
    private notifications: NotificationService,
    private router: Router,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<InsertionCheckItem>, search: ReleaseOrderSearchParams }}) => {
      this.init(data.resolved.list);

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

  private init(data: PageData<InsertionCheckItem>) {
    this.insertions = data.list;

    this.pageCount = data.pageCount;
    this.page = data.page;
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

  mark(state: number) {
    let selectedInsertions = this.insertions.filter(insertion => insertion.checked);

    let selectedIDs = selectedInsertions.map(insertion => insertion.insertions._id);

    this.api.setInsertionCheck(state, selectedIDs).subscribe(data => {
      if (data.success) {
        selectedInsertions.forEach(insertion => insertion.insertions.state = state);
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
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
}
