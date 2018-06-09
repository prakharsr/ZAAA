import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ReleaseOrder, Insertion, TaxValues, OtherCharges } from '../release-order';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { StateApiService, NotificationService, OptionsService, DialogService } from 'app/services';
import { CategoriesDetails } from '../categories-details/categories-details.component';

import {
  Category,
  RateCard,
  FixSize,
  Scheme,
  RateCardApiService
} from 'app/rate-card';

import {
  Client,
  MediaHouse,
  Executive,
  ClientApiService,
  MediaHouseApiService,
  ExecutiveApiService
} from 'app/directory';

@Component({
  selector: 'app-release-order',
  templateUrl: './release-order.component.html',
  styleUrls: ['./release-order.component.css']
})
export class ReleaseOrderComponent implements OnInit {

  releaseorder = new ReleaseOrder();
  query: string;
  edit = false;
  id: string;

  selectedCategories: Category[] = [null, null, null, null, null, null];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ReleaseOrderApiService,
    private mediaHouseApi: MediaHouseApiService,
    private clientApi: ClientApiService,
    private executiveApi: ExecutiveApiService,
    private rateCardApi: RateCardApiService,
    public stateApi: StateApiService,
    private notifications: NotificationService,
    public options: OptionsService,
    private dialog: DialogService) { }

  get isTypeWords() {

    if (this.mediaType == 'Print' && this.releaseorder.adType == 'Text Classified') {
      return true;
    }

    if (this.mediaType == 'Electronic' && this.releaseorder.adType == 'Scroll') {
      return true;
    }

    return false;
  }

  get isTypeLen() {

    if (this.mediaType == 'Print' && this.releaseorder.adType != 'Text Classified') {
      return true;
    }

    return false;
  }

  get isTypeTime() {

    if (this.mediaType == 'Air') {
      return true;
    }

    if (this.mediaType == 'Electronic' && this.releaseorder.adType != 'Scroll') {
      return true;
    }

    return false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.initFromReleaseOrder();
      }
      else if (params.has('copy')) {
        this.initFromReleaseOrder();

        this.releaseorder.releaseOrderNO = "";
        this.releaseorder.id = "";
        this.releaseorder.generated = false;
        this.releaseorder.date = new Date();

        this.releaseorder.insertions = this.releaseorder.insertions.map(insertion => new Insertion(insertion.date));
      }
      else if (params.has('rateCard')) {
        this.route.data.subscribe((data: { rateCard: RateCard }) => this.initFromRateCard(data.rateCard));
      }
      else {
        this.initNew();
      }
    });
  }

  private initNew() {
    this.customSize = true;
    this.customScheme = true;

    this.releaseorder.AdTime = this.adTimes[0];
    this.mediaType = this.mediaTypes[0];
    this.releaseorder.adHue = this.hues[0];
    this.releaseorder.unit = this.units[0];
    this.releaseorder.adPosition = this.positions[0];
    this.selectedTax = this.taxes[0];
    this.releaseorder.paymentType = this.paymentTypes[0];
  }

  private initFromReleaseOrder() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseorder = data.releaseOrder;

      let insertionBkp = this.releaseorder.insertions;

      if (this.releaseorder.adSizeCustom) {
        this.customSize = true;
        this.customSizeL = this.releaseorder.adSizeL;
        this.customSizeW = this.releaseorder.adSizeW;
      }
      else {
        this.fixSizes = [{
          amount: this.releaseorder.adSizeAmount,
          length: this.releaseorder.adSizeL,
          width: this.releaseorder.adSizeW
        }];

        this.selectedSize = this.fixSizes[0];
      }

      // edit only as custom scheme
      this.customScheme = true;
      this.customFree = this.releaseorder.adSchemeFree;
      this.customPaid = this.releaseorder.adSchemePaid;

      this.adCountPaid = (+this.releaseorder.adTotal * +this.customPaid) / (+this.customPaid + +this.customFree);

      this.selectedTax = this.taxes.find(element => element.primary == this.releaseorder.taxAmount.primary
        && element.secondary == this.releaseorder.taxAmount.secondary);

      let dirMediaHouse = new MediaHouse();
      dirMediaHouse.pubName = this.releaseorder.publicationName;
      dirMediaHouse.address.edition = this.releaseorder.publicationEdition;
      dirMediaHouse.address.state = this.releaseorder.publicationState;
      dirMediaHouse.GSTIN = this.releaseorder.publicationGSTIN;
      dirMediaHouse.mediaType = this.releaseorder.mediaType;
      this.mediaHouse = dirMediaHouse;
      
      let dirClient = new Client();
      dirClient.orgName = this.releaseorder.clientName;
      dirClient.address.state = this.releaseorder.clientState;
      dirClient.GSTIN = this.releaseorder.clientGSTIN;
      this.client = dirClient;

      let dirExecutive = new Executive();
      dirExecutive.executiveName = this.releaseorder.executiveName;
      dirExecutive.orgName = this.releaseorder.executiveOrg;
      this.executive = dirExecutive;

      this.releaseorder.insertions = insertionBkp;
    });
  }

  hues = ['Black & White', 'Colored'];

  private initFromRateCard(rateCard: RateCard) {
    if (rateCard) {
      this.releaseorder.mediaType = rateCard.mediaType;
      this.releaseorder.adType = rateCard.adType;
      this.releaseorder.AdTime = rateCard.AdTime;
      this.releaseorder.rate = rateCard.rate;
      this.releaseorder.unit = rateCard.unit;
      this.releaseorder.adHue = rateCard.hue;
      this.releaseorder.adPosition = rateCard.position;
      this.releaseorder.AdWordsMax = rateCard.AdWordsMax;

      this.releaseorder.paymentType = this.paymentTypes[0];
      this.selectedTax = this.taxes[0];

      this.releaseorder.PremiumCustom = rateCard.PremiumCustom;
      this.releaseorder.PremiumBox.Amount = rateCard.PremiumBox;
      this.releaseorder.PremiumBaseColour.Amount = rateCard.PremiumBaseColour;
      this.releaseorder.PremiumEmailId.Amount = rateCard.PremiumEmailId;
      this.releaseorder.PremiumCheckMark.Amount = rateCard.PremiumCheckMark;
      this.releaseorder.PremiumWebsite.Amount = rateCard.PremiumWebsite;
      this.releaseorder.PremiumExtraWords.Amount = rateCard.PremiumExtraWords;

      if (rateCard.fixSizes.length > 0) {
        this.fixSizes = rateCard.fixSizes;
        this.selectedSize = this.fixSizes[0];
      }
      else this.customSize = true;

      if (rateCard.schemes.length > 0) {
        this.schemes = rateCard.schemes;
        this.selectedScheme = this.schemes[0];
      }
      else this.customScheme = true;

      this.mediaHouseApi.searchMediaHouses(rateCard.mediaHouseName).subscribe(data => {
        if (data && data.length > 0) {
          this.mediaHouse = data[0];

          this.initMediaHouse(this.mediaHouse);
        }
      });
    }
  }

  getCategories() {
    this.dialog.getCategoriesDetails().subscribe(data => {
      this.setCategoriesDetails(data);
    });
  }

  setCategoriesDetails(details: CategoriesDetails) {
    this.selectedCategories = details.selectedCategories;
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

          this.notifications.show(data.msg);
        }
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
          this.notifications.show(data.msg);
        }
      }
    )
  }

  submit () {
    this.releaseorder.adTotal = this.availableAds;
    this.releaseorder.adTotalSpace = this.totalSpace;
    this.releaseorder.adGrossAmount = this.grossAmount;
    this.releaseorder.netAmountFigures = this.netAmount;
    this.releaseorder.netAmountWords = this.options.amountToWords(this.netAmount);

    this.releaseorder.taxAmount = this.selectedTax;
    
    if (this.selectedCategories[0]) {
      this.releaseorder.adCategory1 = this.selectedCategories[0].name;
    }
    if (this.selectedCategories[1]) {
      this.releaseorder.adCategory2 = this.selectedCategories[1].name;
    }
    if (this.selectedCategories[2]) {
      this.releaseorder.adCategory3 = this.selectedCategories[2].name;
    }
    if (this.selectedCategories[3]) {
      this.releaseorder.adCategory4 = this.selectedCategories[3].name;
    }
    if (this.selectedCategories[4]) {
      this.releaseorder.adCategory5 = this.selectedCategories[4].name;
    }
    if (this.selectedCategories[5]) {
      this.releaseorder.adCategory6 = this.selectedCategories[5].name;
    }

    this.releaseorder.publicationName = this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse;
    this.releaseorder.clientName = this.client.orgName ? this.client.orgName : this.client;
    this.releaseorder.executiveName = this.executive.executiveName ? this.executive.executiveName : this.executive;

    if (this.customSize) {
      this.releaseorder.adSizeL = this.customSizeL;
      this.releaseorder.adSizeW = this.customSizeW;
      this.releaseorder.adSizeCustom = true;
    }
    else {
      this.releaseorder.adSizeL = this.selectedSize.length;
      this.releaseorder.adSizeW = this.selectedSize.width;
      this.releaseorder.adSizeAmount = this.selectedSize.amount;
      this.releaseorder.adSizeCustom = false;
    }

    if (this.customScheme) {
      this.releaseorder.adSchemeFree = this.customFree;
      this.releaseorder.adSchemePaid = this.customPaid;
    }
    else {
      this.releaseorder.adSchemeFree = this.selectedScheme.Free;
      this.releaseorder.adSchemePaid = this.selectedScheme.paid;
    }
    
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

  initMediaHouse(result: MediaHouse) {
    if (result.address) {
      this.releaseorder.publicationEdition = result.address.edition;
      this.releaseorder.publicationState = result.address.state;
      this.releaseorder.publicationGSTIN = result.GSTIN;

      this.releaseorder.adEdition = result.address.edition;
    }

    this.mediaType = result.mediaType;
  }

  get mediaType() {
    return this.releaseorder.mediaType;
  }

  set mediaType(mediaType: string) {
    this.releaseorder.mediaType = mediaType;

    this.releaseorder.adType = this.adTypes[0];
  }

  mediaTypes = ['Print', 'Air', 'Electronic'];

  get adTypes() {
    switch (this.releaseorder.mediaType) {
      case 'Print':
        return ['Text Classified', 'Display', 'Display Classified'];

      case 'Air':
        return ['RJ Mentions', 'Radio Commercials', 'Sponsorship Tags', 'Road Block'];

      case 'Electronic':
        return ['VJ Mentions', 'Banner', 'Scroll', 'Commercials'];
    }

    return [];
  }

  get adTimes() {
    return ['Any Time', 'Prime Time ', 'Evening', 'Morning'];
  }

  get positions() {
    let result = ['Classified', 'Back Page', 'Jacket', 'Prime Time'];

    for (let i = 1; i <= 8; ++i) {
      result.push('Page ' + i);
    }

    return result;
  }

  get units() {
    let result = [];

    if (this.isTypeLen) {
      result.push('Sqcm');
    }

    if (this.isTypeWords) {
      result.push('Words');
      result.push('Lines');
    }

    if (this.isTypeTime) {
      result.push('sec');
    }

    return result;
  }

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
    this.releaseorder.clientState = result.address.state;
    this.releaseorder.clientGSTIN = result.GSTIN;

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
    this.releaseorder.executiveOrg = result.orgName;

    return result.executiveName;
  }

  executiveResultFormatter = (result: Executive) => result.executiveName;

  isInsertionTimeLimitValid(date: NgbDate) {
    if (!this.customScheme && this.selectedScheme && this.selectedScheme.timeLimit) {
      let now = new Date();
      let last = new Date();
      now.setDate(now.getDate() - 1);
      last.setDate(last.getDate() + this.selectedScheme.timeLimit + 1);

      return date.before(new NgbDate(last.getFullYear(), last.getMonth() + 1, last.getDate()))
        && date.after(new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
    }

    return true;
  }

  addInsertion(date: NgbDate) {
    const index = this.findInsertion(date);

    if (index == -1) {
      if (this.releaseorder.insertions.length >= this.availableAds) {
        this.notifications.show('Total No of Ads reached');
  
        return;
      }
      else if (!this.isInsertionTimeLimitValid(date)) {
        this.notifications.show('Date outside Scheme Time Limit');

        return;
      }

      this.releaseorder.insertions.push(new Insertion(date));
    }
    else this.removeInsertion(index);
  }

  removeInsertion(i: number) {
    this.releaseorder.insertions.splice(i, 1);
  }

  findInsertion(date: NgbDate): number {
    return this.releaseorder.insertions.findIndex(element => element.date.day == date.day
      && element.date.month == date.month
      && element.date.year == date.year);
  }

  isSelected(date: NgbDate) {
    return this.findInsertion(date) != -1;
  }

  getInsertions() {
    this.dialog.getInsertionDetails({
      insertions: this.releaseorder.insertions.map(insertion => new Insertion(insertion.date)),
      availableAds: this.availableAds,
      timeLimit: !this.customScheme && this.selectedScheme && this.selectedScheme.timeLimit
    }).subscribe(data => {
      this.releaseorder.insertions = data;
    });
  }

  fixSizes: FixSize[] = [];

  customSize = false;

  selectedSize: FixSize;

  customSizeL = 0;
  customSizeW = 0;

  schemes: Scheme[] = [];

  _customScheme = false;

  get customScheme() {
    return this._customScheme;
  }

  set customScheme(custom: boolean) {
    this._customScheme = custom;

    this.adCountPaid = custom ? this.customPaid : this.selectedScheme.paid;

    this.releaseorder.insertions = [];
  }

  _selectedScheme: Scheme;

  get selectedScheme() {
    return this._selectedScheme;
  }

  set selectedScheme(scheme: Scheme) {
    this._selectedScheme = scheme;

    this.adCountPaid = scheme.paid;

    this.releaseorder.insertions = [];
  }

  _customPaid = 1;

  get customPaid() {
    return this._customPaid;
  }

  set customPaid(paid: number) {
    this._customPaid = paid;

    this.adCountPaid = paid;

    this.releaseorder.insertions = [];
  }

  customFree = 0;

  get totalSpace() {
    if (this.customSize || this.selectedSize == null) {
      return this.customSizeL * this.customSizeW;
    }
    else return this.selectedSize.length * this.selectedSize.width;
  }

  get grossAmountWithoutPremium() {
    if (this.isTypeLen) {
      if (this.customSize) {
        return this.releaseorder.rate * this.totalSpace;
      }
      else {
        return this.selectedSize.amount;
      }
    }
    else if (this.isTypeTime) {
      return this.releaseorder.rate * this.releaseorder.AdDuration;
    }
    else if (this.isTypeWords) {
      return this.releaseorder.rate;
    }
    else return 0;
  }

  get grossAmountSingle() {
    let amount = this.grossAmountWithoutPremium;

    if (this.isTypeWords) {
      if (this.releaseorder.PremiumBox.Included) {
        amount += this.releaseorder.PremiumBox.Amount;
      }

      if (this.releaseorder.PremiumBaseColour.Included) {
        amount += this.releaseorder.PremiumBaseColour.Amount;
      }
      
      if (this.releaseorder.PremiumCheckMark.Included) {
        amount += this.releaseorder.PremiumCheckMark.Amount;
      }
      
      if (this.releaseorder.PremiumEmailId.Included) {
        amount += this.releaseorder.PremiumEmailId.Amount * this.releaseorder.PremiumEmailId.Quantity;
      }
      
      if (this.releaseorder.PremiumWebsite.Included) {
        amount += this.releaseorder.PremiumWebsite.Amount * this.releaseorder.PremiumWebsite.Quantity;
      }
      
      if (this.releaseorder.PremiumExtraWords.Included) {
        amount += this.releaseorder.PremiumExtraWords.Amount * this.releaseorder.PremiumExtraWords.Quantity;
      }
    }
    else if (this.releaseorder.PremiumCustom.Percentage) {
      amount += (this.releaseorder.PremiumCustom.Amount * amount) / 100;
    }
    else amount += this.releaseorder.PremiumCustom.Amount;

    return amount;
  }

  get grossAmount() {
    return this.grossAmountSingle * this.adCountPaid;
  }

  get netAmount() {
    let amount = this.grossAmount;

    amount -= (this.releaseorder.publicationDiscount * amount / 100);
    amount -= (this.releaseorder.agencyDiscount1 * amount / 100);
    amount -= (this.releaseorder.agencyDiscount2 * amount / 100);

    return Math.ceil(amount);
  }

  adCountPaid = 1;

  get availableAds() {
    if (this.customScheme) {
      let multiplier = this.adCountPaid / this.customPaid;

      return +this.adCountPaid + this.customFree * multiplier;
    }
    
    let multiplier = this.adCountPaid / this.selectedScheme.paid;

    return +this.adCountPaid + this.selectedScheme.Free * multiplier;
  }

  taxes: TaxValues[] = [
    new TaxValues(5),
    new TaxValues(10),
    new TaxValues(14),
    new TaxValues(28, 18)
  ];

  selectedTax: TaxValues;

  get taxDisplay() {
    let tax = this.selectedTax.primary + "%";

    if (this.selectedTax.secondary) {
      tax += " + " + this.selectedTax.secondary + "%"
    }

    return tax + (this.releaseorder.taxIncluded ? " Tax Included" : " Tax Excluded");
  }

  get clientPayment() {
    let amount = this.grossAmount;
    
    this.releaseorder.otherCharges.forEach(element => amount += +element.amount);

    amount -= (this.releaseorder.publicationDiscount * amount / 100);

    return amount;
  }

  otherChargesTypes = ['Designing Charges', 'Extra Copy/Newspaper Charges', 'Certificate Charges'];

  paymentTypes = ['Cash', 'Credit', 'Cheque', 'NEFT'];

  addMediaHouse() {
    let obj = new MediaHouse();

    obj.pubName = this.mediaHouse.pubName ? this.mediaHouse.pubName : this.mediaHouse;
    obj.address.edition = this.releaseorder.publicationEdition;
    obj.address.state = this.releaseorder.publicationState;
    obj.GSTIN = this.releaseorder.publicationGSTIN;
    obj.mediaType = this.releaseorder.mediaType;

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
    obj.address.state = this.releaseorder.clientState;
    obj.GSTIN = this.releaseorder.clientGSTIN;
    
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
  
  addCharges() {
    let item = new OtherCharges();
    item.chargeType = this.otherChargesTypes[0];

    this.releaseorder.otherCharges.push(item);
  }

  removeOtherCharge(i: number) {
    this.releaseorder.otherCharges.splice(i, 1);
  }

  addExecutive() {
    let obj = new Executive();

    obj.executiveName = this.executive.executiveName ? this.executive.executiveName : this.executive;
    obj.orgName = this.releaseorder.executiveOrg;
    
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
