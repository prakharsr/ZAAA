import { Component, OnInit } from '@angular/core';
import { ReleaseOrder, ReleaseOrderSearchParams, ReleaseOrderApiService } from 'app/release-order';
import { ClientApiService, MediaHouseApiService, MediaHouse, Client } from 'app/directory';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-select-release-order',
  templateUrl: './select-release-order.component.html',
  styleUrls: ['./select-release-order.component.css']
})
export class SelectReleaseOrderComponent implements OnInit {

  releaseorder: ReleaseOrder;

  releaseOrders: ReleaseOrder[] = [];

  mediaHouse;
  edition;
  client;

  roNo;

  pastDays = 0;

  constructor(private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private roApi: ReleaseOrderApiService) { }

  ngOnInit() {
    this.search();
  }

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientNameFormatter = (client: Client) => client.orgName;
  
  private get clientName() {
    if (this.client instanceof String) {
      return this.client;
    }

    return this.client ? this.client.orgName : null;
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

  private get editionName() {
    if (this.edition instanceof String) {
      return this.edition;
    }

    return this.edition ? (this.edition.address ? this.edition.address.edition : null) : null;
  }

  editionFormatter = (mediaHouse: MediaHouse) => mediaHouse.address.edition;

  mediaHouseNameFormatter = (mediaHouse: MediaHouse) => {
    this.edition = mediaHouse;

    return mediaHouse.pubName;
  }

  search() {
    this.releaseOrders = [];
    
    let queryParams = new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, this.clientName, '', '', this.pastDays);

    this.roApi.searchReleaseOrders(1, queryParams, true, this.roNo).subscribe(data => {
      this.releaseOrders = data.list;
    });
  }
}
