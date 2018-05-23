import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AdvanceReceipt } from '../payment-receipt';
import { ReceiptsApiService } from '../receipts-api.service';
import { NotificationService, StateApiService } from 'app/services';

import {
  Client,
  MediaHouse,
  Executive,
  ClientApiService,
  MediaHouseApiService,
  ExecutiveApiService
} from 'app/directory';

@Component({
  selector: 'app-advance-receipt',
  templateUrl: './advance-receipt.component.html',
  styleUrls: ['./advance-receipt.component.css']
})
export class AdvanceReceiptComponent implements OnInit {

  receipt = new AdvanceReceipt();

  constructor(private router: Router,
    private api: ReceiptsApiService,
    private mediaHouseApi: MediaHouseApiService,
    private clientApi: ClientApiService,
    private executiveApi: ExecutiveApiService,
    private notifications: NotificationService,
    public stateApi: StateApiService) { }

  ngOnInit() {
    this.receipt.paymentType = this.paymentTypes[0];
  }

  private goBack() {
    this.router.navigateByUrl('/receipts/advance');
  }

  submit() {
    this.receipt.publicationName = this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse;
    this.receipt.clientName = this.client.orgName ? this.client.orgName : this.client;
    this.receipt.executiveName = this.executive.executiveName ? this.executive.executiveName : this.executive;

    this.api.createAdvanceReceipt(this.receipt).subscribe(data => {
      if (data.success) {
        this.goBack();
      }
      else {
        this.notifications.show(data.msg);
      }
    });
  }

  cancel() {
    this.goBack();
  }

  paymentTypes = ['Cash', 'Credit', 'Cheque', 'NEFT'];

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  mediaHouse;

  initMediaHouse(result: MediaHouse) {
    if (result.address) {
      this.receipt.publicationEdition = result.address.edition;
      this.receipt.publicationState = result.address.state;
      this.receipt.publicationGSTIN = result.GSTIN;
    }
  }

  mediaTypes = ['Print', 'Air', 'Electronic'];

  mediaHouseInputFormatter = (result: MediaHouse) => {
    this.initMediaHouse(result);

    return result.pubName;
  }

  mediaHouseResultFormatter = (result: MediaHouse) => result.pubName + " - " + result.address.edition;

  client;

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientInputFormatter = (result: Client) => {
    this.receipt.clientState = result.address.state;
    this.receipt.clientGSTIN = result.GSTIN;

    return result.orgName;
  }

  clientResultFormatter = (result: Client) => result.orgName;

  executive;

  searchExecutive = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutives(term))
      .catch(() => of([]));
  }

  executiveInputFormatter = (result: Executive) => {
    this.receipt.executiveOrg = result.orgName;

    return result.executiveName;
  }

  executiveResultFormatter = (result: Executive) => result.executiveName;

  addMediaHouse() {
    let obj = new MediaHouse();

    obj.pubName = this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse;
    obj.address.edition = this.receipt.publicationEdition;
    obj.address.state = this.receipt.publicationState;
    obj.GSTIN = this.receipt.publicationGSTIN;

    this.mediaHouseApi.createMediaHouse(obj).subscribe(data => {
      if (data.success) {
        this.notifications.show('Added to Directory');
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  addClient() {
    let obj = new Client();

    obj.orgName = this.client.orgName ? this.client.orgName : this.client;
    obj.address.state = this.receipt.clientState;
    obj.GSTIN = this.receipt.clientGSTIN;
    
    this.clientApi.createClient(obj).subscribe(data => {
      if (data.success) {
        this.notifications.show('Added to Directory');
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }

  addExecutive() {
    let obj = new Executive();

    obj.executiveName = this.executive.executiveName ? this.executive.executiveName : this.executive;
    obj.orgName = this.receipt.executiveOrg;
    
    this.executiveApi.createExecutive(obj).subscribe(data => {
      if (data.success) {
        this.notifications.show('Added to Directory');
      }
      else {
        console.log(data);

        this.notifications.show(data.msg);
      }
    });
  }
}
