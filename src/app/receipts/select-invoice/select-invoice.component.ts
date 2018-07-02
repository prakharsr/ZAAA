import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceApiService } from 'app/invoice';
import { ClientApiService, MediaHouseApiService, MediaHouse, Client } from 'app/directory';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { ReleaseOrderSearchParams } from '../../release-order';

@Component({
  selector: 'app-select-invoice',
  templateUrl: './select-invoice.component.html',
  styleUrls: ['./select-invoice.component.css']
})
export class SelectInvoiceComponent implements OnInit {

  invoice: Invoice

  invoices: Invoice[] = [];

  mediaHouse;
  edition;
  client;

  pastDays = 0;

  constructor(private clientApi: ClientApiService,
    private mediaHouseApi: MediaHouseApiService,
    private invoiceApi: InvoiceApiService) { }

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
    this.invoices = [];
    
    let queryParams = new ReleaseOrderSearchParams(this.mediaHouseName, this.editionName, this.clientName, '', '', this.pastDays);

    this.invoiceApi.searchInvoices(1, queryParams).subscribe(data => {
      this.invoices = data.list;
    });
  }
}
