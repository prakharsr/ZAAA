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
import { StateApiService } from '../../services/state-api.service';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { RateCard } from '../../rate-card/rateCard';
import { RateCardApiService } from '../../rate-card/rate-card-api.service';

@Component({
  selector: 'app-release-order',
  templateUrl: './release-order.component.html',
  styleUrls: ['./release-order.component.css']
})
export class ReleaseOrderComponent implements OnInit {

  releaseorder = new ReleaseOrder();
  error: string;
  edit = false;
  id: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ReleaseOrderApiService,
    private mediaHouseApi: MediaHouseApiService,
    private clientApi: ClientApiService,
    private executiveApi: ExecutiveApiService,
    private rateCardApi: RateCardApiService,
    public stateApi: StateApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.api.getReleaseOrder(this.id).subscribe(data => {
          if (data) {
            this.releaseorder = data;
          }
        });
      }
      else if (params.has('rateCard')) {
        this.rateCardApi.getRateCard(params.get('rateCard')).subscribe(data => this.initFromRateCard(data));
      }
    });
  }

  private initFromRateCard(rateCard: RateCard) {
    if (rateCard) {
      this.releaseorder.adType = rateCard.adType;
      this.releaseorder.adHue = rateCard.hue;
      this.releaseorder.adPosition = rateCard.position;
    }
  }

  private goBack() {
    this.router.navigateByUrl(this.edit ? '/releaseorders/' + this.id : '/releaseorders');
  }

  cancel() {
    this.goBack();
  }

  private createReleaseOrder() {
    this.api.createReleaseOrder(this.releaseorder).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          console.log(data);

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    );
  }

  private editReleaseOrder() {
    this.api.editReleaseOrder(this.releaseorder).subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
      }
    )
  }

  submit () {
    this.error = '';

    this.releaseorder.publicationName = this.mediaHouse.orgName ? this.mediaHouse.orgName : this.mediaHouse;
    this.releaseorder.clientName = this.client.orgName ? this.client.orgName : this.client;
    this.releaseorder.executiveName = this.executive.executiveName ? this.executive.executiveName : this.executive;

    if (this.edit) {
      this.editReleaseOrder();
    }
    else this.createReleaseOrder();
  }

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  mediaHouse;

  mediaHouseInputFormatter = (result: DirMediaHouse) => {
    if (result.address) {
      this.releaseorder.publicationEdition = result.address.edition;
      this.releaseorder.publicationAddress = result.address.address;
      this.releaseorder.publicationCity = result.address.city;
      this.releaseorder.publicationState = result.address.state;
    }

    return result.orgName;
  }

  mediaHouseResultFormatter = (result: DirMediaHouse) => result.orgName;

  client;

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

  executive;

  searchExecutive = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.executiveApi.searchExecutives(term))
      .catch(() => of([]));
  }

  executiveFormatter = (result: DirExecutive) => result.executiveName;
}
