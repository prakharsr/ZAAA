import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { RateCardApiService } from '../rate-card-api.service';
import { MediaHouseApiService, MediaHouse, Pullout } from 'app/directory';
import { NotificationService, OptionsService, DialogService } from 'app/services';
import { RateCard, FixSize, Scheme, Covered, Remark, Tax } from '../rate-card';
import { SuperAdminApiService } from '../../super-admin/super-admin-api.service';

@Component({
  selector: 'app-rate-card',
  templateUrl: './rate-card.component.html',
  styleUrls: ['./rate-card.component.css']
})
export class RateCardComponent implements OnInit {

  edit = false;
  id: string;
  query: string;

  others = "Others";

  dropdownPullOutName: string;
  customPullOutName = 'Main';

  isSuperAdmin = false;

  constructor(private api: RateCardApiService,
    private route: ActivatedRoute,
    private router: Router,
    private mediaHouseApi: MediaHouseApiService,
    private notifications: NotificationService,
    private options: OptionsService,
    private superAdminApi: SuperAdminApiService,
    private dialog: DialogService) { }

  rateCard = new RateCard();
  selectedCategories: string[] = [null, null, null, null, null, null];

  get isTypeWords() {

    if (this.mediaType == 'Print' && this.rateCard.adType == 'Text Classified') {
      return true;
    }

    if (this.mediaType == 'Electronic' && this.rateCard.adType == 'Scroll') {
      return true;
    }

    return false;
  }

  get isTypeLen() {

    if (this.mediaType == 'Print' && this.rateCard.adType != 'Text Classified') {
      return true;
    }

    return false;
  }

  get isTypeTime() {

    if (this.mediaType == 'Air') {
      return true;
    }

    if (this.mediaType == 'Electronic' && this.rateCard.adType != 'Scroll') {
      return true;
    }

    return false;
  }

  private initNew() {
    this.mediaType = this.mediaTypes[0];
    this.rateCard.rateCardType = this.rateCardTypes[0];
    // this.rateCard.unit = this.units[0];
    this.rateCard.position = this.options.positions[0];
    this.rateCard.hue = this.hues[0];
    this.rateCard.AdTime = this.adTimes[0];
    this.dropdownPullOutName = this.others;

    this.rateCard.rate = null;
  }

  private initEdit(data: RateCard) {
    if (data) {
      this.rateCard = data;

      let dirMediaHouse = new MediaHouse();
      dirMediaHouse.pubName = this.rateCard.mediaHouseName;
      dirMediaHouse.address.edition = this.rateCard.bookingEdition;
      this.mediaHouse = dirMediaHouse;
      this.edition = dirMediaHouse;

      this.dropdownPullOutName = this.others;
      this.customPullOutName = this.rateCard.pullOutName;

      if (this.rateCard.categories) {
        for (let i = 0; i < this.selectedCategories.length && i < this.rateCard.categories.length; ++i) {
          this.selectedCategories[i] = this.rateCard.categories[i];
        }
      }
    }
  }

  mediaHouse;
  edition;

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }

  searchEdition = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHousesByEdition(term, this.mediaHouseName))
      .catch(() => of([]));
  }

  pullouts: Pullout[] = [];
  
  mediaHouseInputFormatter = (result: MediaHouse) => {
    this.edition = result;

    if (result.pullouts) {
      this.pullouts = result.pullouts;
    }

    return result.pubName;
  }
  
  mediaHouseResultFormatter = (result: MediaHouse) => result.pubName + " - " + result.address.edition;

  editionInputFormatter = (result: MediaHouse) => {
    if (result.pullouts) {
      this.pullouts = result.pullouts;
    }

    return result.address.edition;
  }
  
  editionResultFormatter = (result: MediaHouse) => result.address.edition;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.route.data.subscribe((data: { rateCard: RateCard }) => {
          this.initEdit(data.rateCard);
        });
      }
      else if (params.has('copy')) {
        this.route.data.subscribe((data: { rateCard: RateCard }) => {
          this.initEdit(data.rateCard);
        });
      }
      else this.initNew();
    });

    this.route.data.subscribe((data: { superAdmin: boolean }) => {
      this.isSuperAdmin = data.superAdmin;
    });
  }

  private goBack() {
    this.router.navigateByUrl((this.isSuperAdmin ? '/superadmin' : '') + (this.edit ? '/ratecards/' + this.id : '/ratecards'));
  }

  mediaTypes = ['Print', 'Air', 'Electronic'];

  hues = ['Black & White', 'Colored'];

  get mediaType() {
    return this.rateCard.mediaType;
  }

  set mediaType(mediaType: string) {
    this.rateCard.mediaType = mediaType;

    this.rateCard.adType = this.adTypes[0];
    // this.rateCard.unit = this.units[0];
  }

  get adTypes() {
    switch (this.rateCard.mediaType) {
      case 'Print':
        return ['Text Classified', 'Display', 'Display Classified'];

      case 'Air':
        return ['RJ Mentions', 'Radio Commercials', 'Sponsorship Tags', 'Road Block'];

      case 'Electronic':
        return ['VJ Mentions', 'Banner', 'Scroll', 'Commercials'];
    }

    return [];
  }

  rateCardTypes = ['Local', 'Regional', 'Corporate'];

  // get units() {
  //   let result = [];

  //   if (this.isTypeLen) {
  //     result.push('Sqcm');
  //   }

  //   if (this.isTypeWords) {
  //     result.push('Words');
  //     result.push('Lines');
  //   }

  //   if (this.isTypeTime) {
  //     result.push('sec');
  //   }

  //   return result;
  // }

  get rateText() {
    if (this.isTypeLen) {
      //return this.releaseorder.fixRate ? "Rate per insertion" : "Rate per sqcm";

      return "Rate per sqcm";
    }

    if (this.isTypeWords) {
      return "Rate per insertion";
    }

    if (this.isTypeTime) {
      return "Rate per sec";
    }
  }

  getCategories() {
    this.dialog.getCategoriesDetails({
      categories: this.selectedCategories,
      fixedLevel: -1
    }).subscribe(data => {
      if (data) {
        this.selectedCategories = data.selectedCategories.map(M => M ? M.name : null);
      }
    });
  }

  addFixSize() {
    this.rateCard.fixSizes.push(new FixSize());
  }

  removeFixSize(i: number) {
    this.rateCard.fixSizes.splice(i, 1);
  }

  adTimes = ['Any Time', 'Prime Time ', 'Evening', 'Morning'];

  addScheme(){
    this.rateCard.schemes.push(new Scheme());
  }

  removeScheme(i: number){
    this.rateCard.schemes.splice(i, 1);
  }

  addCovered() {
    this.rateCard.covered.push(new Covered());
  }

  copyCovered() {
    let covered = new Covered();

    covered.covMediaHouse = this.mediaHouseName;
    covered.covEdition = this.editionName;

    this.rateCard.covered.push(covered);
  }

  removeCovered(i: number) {
    this.rateCard.covered.splice(i, 1);
  }

  addRemark() {
    this.rateCard.remarks.push(new Remark());
  }

  removeRemark(i: number) {
    this.rateCard.remarks.splice(i, 1);
  }

  addTax() {
    this.rateCard.taxes.push(new Tax());
  }

  removeTax(i: number) {
    this.rateCard.taxes.splice(i, 1);
  }

  private createRateCard() {
    let base : Observable<any>

    if (this.isSuperAdmin) {
      base = this.superAdminApi.createGlobalRateCard(this.rateCard);
    }
    else base = this.api.createRateCard(this.rateCard);

    base.subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }

  private editRateCard() {
    let base : Observable<any>

    if (this.isSuperAdmin) {
      base = this.superAdminApi.updateGlobalRateCard(this.rateCard);
    }
    else base = this.api.editRateCard(this.rateCard);

    base.subscribe(
      data => {
        if (data.success) {
          this.goBack();
        }
        else {
          this.notifications.show(data.msg);
        }
      }
    )
  }

  private get editionName() {
    return this.edition && this.edition.address && this.edition.address.edition
    ? this.edition.address.edition : this.edition;
  }

  private get mediaHouseName() {
    return this.mediaHouse && this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse;
  }

  submit () {
    this.rateCard.categories = [];

    this.rateCard.mediaHouseName = this.mediaHouseName;

    this.rateCard.bookingEdition = this.editionName;

    this.selectedCategories.forEach(element => {
      if (element) {
        this.rateCard.categories.push(element);
      }
    });

    this.rateCard.pullOutName = this.dropdownPullOutName == this.others ? this.customPullOutName : this.dropdownPullOutName;

    if (this.edit) {
      this.editRateCard();
    }
    else this.createRateCard();
  }

  cancel() {
    this.goBack();
  }
}
