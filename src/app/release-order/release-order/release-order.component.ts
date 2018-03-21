import { Component, OnInit } from '@angular/core';
import { ReleaseOrder } from '../releaseOrder';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { ClientApiService } from '../../directory/clients/client-api.service';
import { DirMediaHouse } from '../../directory/media-houses/dirMediaHouse';
import { DirClient } from '../../directory/clients/dirClient';
import { DirExecutive } from '../../directory/executives/dirExecutive';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';

@Component({
  selector: 'app-release-order',
  templateUrl: './release-order.component.html',
  styleUrls: ['./release-order.component.css']
})
export class ReleaseOrderComponent implements OnInit {

  releaseorder = new ReleaseOrder();
  error: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private mediaHouseApi: MediaHouseApiService,
    private clientApi: ClientApiService,
    private executiveApi: ExecutiveApiService) { }

  ngOnInit() {
  }

  cancel() {}

  submit() {}

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  mediaHouseInputFormatter = (result: DirMediaHouse) => {
    this.releaseorder.publicationEdition = result.address.edition;
    this.releaseorder.publicationAddress = result.address.address;
    this.releaseorder.publicationCity = result.address.city;
    this.releaseorder.publicationState = result.address.state;

    return result.orgName;
  }

  mediaHouseResultFormatter = (result: DirMediaHouse) => result.orgName;

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientInputFormatter = (result: DirClient) => {
    this.releaseorder.clientAddress = result.address.address;
    this.releaseorder.clientCity = result.address.city;
    this.releaseorder.clientState = result.address.state;

    return result.orgName;
  }

  clientResultFormatter = (result: DirClient) => result.orgName;

  searchExecutive = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutives(term))
      .catch(() => of([]));
  }

  executiveFormatter = (result: DirExecutive) => result.executiveName;
}
