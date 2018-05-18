import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../invoice';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';
import { PageData } from '../../models/page-data';
import { ReleaseOrderSearchParams } from '../../release-order/release-order-search-params';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService } from '../../directory/clients/client-api.service';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';
import { of } from 'rxjs/observable/of';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  invoices: Invoice[] = [];

  pageCount: number;
  page: number;

  dummyArray;

  mediaHouse;
  edition;
  client;
  executive;
  executiveOrg;

  pastDays = 0;

  constructor(private route: ActivatedRoute,
    private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private executiveApi: ExecutiveApiService,
    private router: Router,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { resolved: { list: PageData<Invoice>, search: ReleaseOrderSearchParams }}) => {
      this.invoices = data.resolved.list.list;

      this.pageCount = data.resolved.list.pageCount;
      this.page = data.resolved.list.page;

      this.dummyArray = Array(this.pageCount);

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
    this.router.navigate(['/invoices/list/', pageNo], {
      queryParams: new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, this.clientName, this.executiveName, this.exeOrg, this.pastDays)
    });
  }

  createPaymentReceipt(invoice: Invoice) {
    if (invoice.pendingAmount <= 0) {
      this.notifications.show('All Payments have been completed for this Invoice');

      return;
    }

    this.router.navigate(['/receipts/new', invoice.id]);
  }
}
