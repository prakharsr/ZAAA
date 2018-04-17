import { Component, OnInit } from '@angular/core';
import { ReleaseOrder, Insertion, TaxValues, OtherCharges } from '../release-order';
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
import { MediaHouse } from '../../directory/media-houses/media-house';
import { Client } from '../../directory/clients/client';
import { Executive } from '../../directory/executives/executive';
import { ExecutiveApiService } from '../../directory/executives/executive-api.service';
import { StateApiService } from '../../services/state-api.service';
import { ReleaseOrderApiService } from '../release-order-api.service';
import { RateCard, Category, FixSize, Scheme } from '../../rate-card/rate-card';
import { RateCardApiService } from '../../rate-card/rate-card-api.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NotificationService } from '../../services/notification.service';

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

  fixedCategoriesLevel = -1;

  selectedCategories: Category[] = [null, null, null, null, null, null];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ReleaseOrderApiService,
    private mediaHouseApi: MediaHouseApiService,
    private clientApi: ClientApiService,
    private executiveApi: ExecutiveApiService,
    private rateCardApi: RateCardApiService,
    public stateApi: StateApiService,
    private notifications: NotificationService) { }

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

    this.releaseorder.adTime = this.adTimes[0];
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

      this.buildCategoryTree([
        this.releaseorder.adCategory1,
        this.releaseorder.adCategory2,
        this.releaseorder.adCategory3,
        this.releaseorder.adCategory4,
        this.releaseorder.adCategory5,
        this.releaseorder.adCategory6
      ]);

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
      dirMediaHouse.orgName = this.releaseorder.publicationName;
      dirMediaHouse.address.edition = this.releaseorder.publicationEdition;
      dirMediaHouse.address.state = this.releaseorder.publicationState;
      dirMediaHouse.GSTIN = this.releaseorder.publicationGSTIN;
      dirMediaHouse.mediaType = this.releaseorder.mediaType;
      this.mediaHouse = dirMediaHouse;
      
      let dirClient = new Client();
      dirClient.orgName = this.releaseorder.clientName;
      dirClient.address.state = this.releaseorder.clientState;
      dirClient.gstNo = this.releaseorder.clientGSTIN;
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
      this.releaseorder.adType = rateCard.adType;
      this.releaseorder.adTime = rateCard.adTime;
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

      for (let i = 0; i < rateCard.categories.length; ++i) {
        if (rateCard.categories[i]) {
          ++this.fixedCategoriesLevel;
        }
        else break;
      }

      this.buildCategoryTree(rateCard.categories);

      this.mediaHouseApi.searchMediaHouses(rateCard.mediaHouseName).subscribe(data => {
        if (data && data.length > 0) {
          this.mediaHouse = data[0];

          this.initMediaHouse(this.mediaHouse);
        }
      });
    }
  }

  private buildCategoryTree(categories: string[]) {
    let c : Category = this.categories.find(p => p.name == categories[0]);

    if (c) {
      this.category1 = c;

      let i = 1;

      while (i < categories.length && c.subcategories.length > 0) {
        c = c.subcategories.find(p => p.name == categories[i]);

        if (c) {
          this.setCategory(i, c);

          ++i;
        }
        else break;
      }
    }
  }

  findSubCategories(category: Category, query: string): Category[] {
    let result : Category[] = [];

    if (category.name.toLowerCase().indexOf(query.toLowerCase()) != -1) {
      result.push(category);
    }

    if (category.subcategories) {
      category.subcategories.forEach(subCategory => {
        this.findSubCategories(subCategory, query).forEach(a => result.push(a));
      });
    }

    return result;
  }

  findCategories(query: string): Category[]  {
    let result : Category[] = [];

    if (query) {
      let base = this.categories;

      if (this.fixedCategoriesLevel > -1) {
        base = this.selectedCategories[this.fixedCategoriesLevel].subcategories;
      }

      base.forEach(element => {
        this.findSubCategories(element, query).forEach(a => result.push(a));
      });
    }

    return result;

  }

  searchCategories = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .pipe(
        map(term => this.findCategories(term))
      )
      .catch(() => of([]));
  }

  categoryInputFormatter = (result: Category) => {
    let stack : Category[] = [];

    while (result) {
      stack.push(result);
      result = result.parent;
    }

    let j = this.fixedCategoriesLevel + 1;

    while (j > 0) {
      stack.pop();

      --j;
    }

    let i = this.fixedCategoriesLevel + 1;

    while (stack.length) {
      this.setCategory(i, stack.pop());

      ++i;
    }
  }

  categoryResultFormatter = (result: Category) => {
    let stack : Category[] = [];

    while (result) {
      stack.push(result);
      result = result.parent;
    }

    let formatted = stack.pop().name;

    while (stack.length) {
      formatted += " > " + stack.pop().name;
    }

    return formatted;
  }

  categories = [
    new Category('Property'),
    new Category('Education'),
    new Category('Medical', [
      new Category('Surgery', [
        new Category('C', [
          new Category('Heart Surgery', [
            new Category('Transplant', [
              new Category('Deepest')
            ])
          ])
        ]),
        new Category('R', [
          new Category('S', [
            new Category('Deepest')
          ])
        ])
      ])
    ]),
    new Category('Women'),
    new Category('Real Estate')
  ];

  getCategory(index: number) {
    return this.selectedCategories[index];
  }

  setCategory(index: number, category: Category) {
    if (this.selectedCategories[index] == category) {
      return;
    }

    this.selectedCategories[index] = category;

    for (let i = index + 1; i < this.selectedCategories.length; ++i) {
      this.setCategory(i, null);
    }
  }

  get category1() { return this.getCategory(0); }
  get category2() { return this.getCategory(1); }
  get category3() { return this.getCategory(2); }
  get category4() { return this.getCategory(3); }
  get category5() { return this.getCategory(4); }
  get category6() { return this.getCategory(5); }

  set category1(category: Category) { this.setCategory(0, category); }
  set category2(category: Category) { this.setCategory(1, category); }
  set category3(category: Category) { this.setCategory(2, category); }
  set category4(category: Category) { this.setCategory(3, category); }
  set category5(category: Category) { this.setCategory(4, category); }
  set category6(category: Category) { this.setCategory(5, category); }

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
      },
      err => {
        console.log(err);

        this.notifications.show('Connection failed');
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
      },
      err => {
        console.log(err);

        this.notifications.show('Connection failed');
      }
    )
  }

  submit () {
    this.releaseorder.adTotal = this.availableAds;
    this.releaseorder.adTotalSpace = this.totalSpace;
    this.releaseorder.adGrossAmount = this.grossAmount;
    this.releaseorder.netAmountFigures = this.netAmount;
    this.releaseorder.netAmountWords = this.amountToWords(this.netAmount);

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

    this.releaseorder.publicationName = this.mediaHouse.orgName ? this.mediaHouse.orgName : this.mediaHouse;
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

    if (this.releaseorder.adType == 'Text Classified') {
      result.push('Words');
    }
    else result.push(this.releaseorder.mediaType == 'Print' ? 'Sqcm' : 'sec');

    return result;
  }

  mediaHouseInputFormatter = (result: MediaHouse) => {
    this.initMediaHouse(result);

    return result.orgName;
  }

  mediaHouseResultFormatter = (result: MediaHouse) => result.orgName + " - " + result.address.edition;

  client;

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientInputFormatter = (result: Client) => {
    this.releaseorder.clientState = result.address.state;
    this.releaseorder.clientGSTIN = result.gstNo;

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
        return (this.releaseorder.rate * this.totalSpace) * this.adCountPaid;
      }
      else {
        return this.selectedSize.amount * this.adCountPaid;
      }
    }
    else if (this.isTypeTime) {
      return this.releaseorder.rate * this.releaseorder.AdDuration * this.adCountPaid;
    }
    else if (this.isTypeWords) {
      return this.releaseorder.rate * this.releaseorder.AdWords * this.adCountPaid;
    }
    else return 0;
  }

  get grossAmount() {
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

  amountToWords(num) {
    if (!num) {
      return "Zero Only";
    }

    let a = [
      '',
      'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ',
      'Ten ',
      'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '
    ];
    
    let b = [
      '', '',
      'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    
    let c = ['Crore ', 'Lakh ', 'Thousand ', 'Hundred '];
  
    if ((num = num.toString()).length > 9)
      return 'overflow';

    let n : any = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    
    if (!n)
      return;
      
    let str = '';

    for (let i = 0; i < 4; ++i) {
      str += (n[i + 1] != 0) ? (a[Number(n[i + 1])] || b[n[i + 1][0]] + ' ' + a[n[i + 1][1]]) + c[i] : '';
    }

    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Only' : '';
    
    return str;
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

  paymentTypes = ['Cash', 'Cheque', 'NEFT'];

  addMediaHouse() {
    let obj = new MediaHouse();

    obj.orgName = this.mediaHouse.orgName ? this.mediaHouse.orgName : this.mediaHouse;
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
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }

  addClient() {
    let obj = new Client();

    obj.orgName = this.client.orgName ? this.client.orgName : this.client;
    obj.address.state = this.releaseorder.clientState;
    obj.gstNo = this.releaseorder.clientGSTIN;
    
    this.clientApi.createClient(obj).subscribe(data => {
      if (data.success) {
        this.notifications.show('Added to Directory');
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
    },
    err => {
      console.log(err);

      this.notifications.show('Connection failed');
    });
  }
}
