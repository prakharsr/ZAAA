import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageData } from '../../models/page-data';
import { InsertionCheckItem } from '../insertion-check-item';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { NotificationService } from '../../services/notification.service';
import { ClientApiService } from '../../directory/clients/client-api.service';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { DialogService } from '../../services/dialog.service';
import { ReleaseOrder } from '../release-order';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-insertion-check',
  templateUrl: './insertion-check.component.html',
  styleUrls: ['./insertion-check.component.css']
})
export class InsertionCheckComponent implements OnInit {

  insertions: InsertionCheckItem[] = [];

  displayedColumns = ['data', 'action'];
  dataSource = new MatTableDataSource();

  page: number;
  pageCount: number;

  pastDays = 0;
  
  dummyArray;

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
    this.route.data.subscribe((data: { list: PageData<InsertionCheckItem> }) => {
      this.init(data.list);
    });
  }

  private init(data: PageData<InsertionCheckItem>) {
    this.insertions = data.list;

    this.dataSource.data = this.insertions;

    this.pageCount = data.pageCount;
    this.page = data.page;

    this.dummyArray = Array(this.pageCount);
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
    return this.executive ? (this.executive.executiveName ? this.executive.executiveName : this.executive) : null;
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
    return this.mediaHouse ? (this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse) : null;
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
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }

  private get editionName() {
    return this.edition ? (this.edition.address ? this.edition.address.edition : this.edition) : null;
  }

  private get clientName() {
    return this.client ? (this.client.orgName ? this.client.orgName : this.client) : null;
  }

  private get exeOrg() {
    return this.executiveOrg ? (this.executiveOrg.orgName ? this.executiveOrg.orgName : this.executiveOrg) : null;
  }

  search() {
    this.api.searchInsertions(this.mediaHouseName, this.editionName, this.clientName, this.executiveName, this.exeOrg, this.pastDays).subscribe(data => {
      this.init(data);

      this.notifications.show('Searched')
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }
}