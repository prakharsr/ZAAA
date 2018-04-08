import { Component, OnInit } from '@angular/core';
import { ReleaseOrder, Insertion } from '../releaseOrder';
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
import { RateCard, Category, FixSize, Scheme } from '../../rate-card/rateCard';
import { RateCardApiService } from '../../rate-card/rate-card-api.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

@Component({
  selector: 'app-release-order',
  templateUrl: './release-order.component.html',
  styleUrls: ['./release-order.component.css']
})
export class ReleaseOrderComponent implements OnInit {

  releaseorder = new ReleaseOrder();
  query: string;
  error: string;
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
    public stateApi: StateApiService) { }

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
    this.releaseorder.insertions = [new Insertion()];

    this.selectedSize = this.customSize;
    this.selectedScheme = this.customScheme;

    this.releaseorder.adTime = this.adTimes[0];
    this.mediaType = this.mediaTypes[0];
    this.releaseorder.adHue = 'Colored';
    this.releaseorder.unit = this.units[0];
    this.releaseorder.adPosition = this.positions[0];
    this.releaseorder.adTime = this.adTimes[0];
    this.selectedTax = this.taxes[0];
    this.releaseorder.otherChargesType = this.otherChargesTypes[0];
    this.releaseorder.paymentType = this.paymentTypes[0];
  }

  private initFromReleaseOrder() {
    this.route.data.subscribe((data: { releaseOrder: ReleaseOrder }) => {
      this.releaseorder = data.releaseOrder;

      this.buildCategoryTree([
        this.releaseorder.adCategory1,
        this.releaseorder.adCategory2,
        this.releaseorder.adCategory3,
        this.releaseorder.adCategory4,
        this.releaseorder.adCategory5,
        this.releaseorder.adCategory6
      ]);

      // edit only as custom size
      this.selectedSize = this.customSize;
      this.customSizeL = this.releaseorder.adSizeL;
      this.customSizeW = this.releaseorder.adSizeW;

      // edit only as custom scheme
      this.selectedScheme = this.customScheme;
      this.customFree = this.releaseorder.adSchemeFree;
      this.customPaid = this.releaseorder.adSchemePaid;

      // this is totally wrong
      this.selectedTax = this.taxes[0];
    });
  }

  private initFromRateCard(rateCard: RateCard) {
    if (rateCard) {
      this.releaseorder.adType = rateCard.adType;
      this.releaseorder.rate = rateCard.rate;
      this.releaseorder.unit = rateCard.unit;
      this.releaseorder.adHue = rateCard.hue;
      this.releaseorder.adPosition = rateCard.position;

      this.releaseorder.paymentType = this.paymentTypes[0];
      this.releaseorder.otherChargesType = this.otherChargesTypes[0];
      this.selectedTax = this.taxes[0];

      if (rateCard.fixSizes.length > 0) {
        this.fixSizes = rateCard.fixSizes;
        this.selectedSize = this.fixSizes[0];
      }
      else this.selectedSize = this.customSize;

      if (rateCard.schemes.length > 0) {
        this.schemes = rateCard.schemes;
        this.selectedScheme = this.schemes[0];
      }
      else this.selectedScheme = this.customScheme;

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
      this.categories.forEach(element => {
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

    let i = 0;

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

    this.releaseorder.adTotal = this.totalAds;
    this.releaseorder.adGrossAmount = this.grossAmount;
    this.releaseorder.netAmountFigures = this.netAmount;
    this.releaseorder.netAmountWords = this.amountToWords(this.netAmount);
    
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

    if (this.selectedSize == this.customSize) {
      this.releaseorder.adSizeL = this.customSizeL;
      this.releaseorder.adSizeW = this.customSizeW;
    }
    else {
      this.releaseorder.adSizeL = this.selectedSize.length;
      this.releaseorder.adSizeW = this.selectedSize.width;
    }

    if (this.selectedScheme == this.customScheme) {
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

  initMediaHouse(result: DirMediaHouse) {
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

  mediaHouseInputFormatter = (result: DirMediaHouse) => {
    this.initMediaHouse(result);

    return result.orgName;
  }

  mediaHouseResultFormatter = (result: DirMediaHouse) => result.orgName + " - " + result.address.edition;

  client;

  searchClient = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.clientApi.searchClients(term))
      .catch(() => of([]));
  }

  clientInputFormatter = (result: DirClient) => {
    this.releaseorder.clientState = result.address.state;
    this.releaseorder.clientGSTIN = result.gstNo;

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

  executiveInputFormatter = (result: DirExecutive) => {
    this.releaseorder.executiveOrg = result.orgName;

    return result.executiveName;
  }

  executiveResultFormatter = (result: DirExecutive) => result.executiveName;

  currentInsertionDate: NgbDate[];

  insertions: NgbDate[] = [];

  insertionErr;

  addInsertion(date: NgbDate) {
    this.insertionErr = '';

    const index = this.findInsertion(date);

    if (index == -1) {
      if (this.insertions.length >= this.availableAds) {
        this.insertionErr = 'Total No of Ads reached';
  
        return;
      }

      this.insertions.push(date);
    }
    else this.removeInsertion(index);
  }

  removeInsertion(i: number) {
    this.insertionErr = '';

    this.insertions.splice(i, 1);
  }

  findInsertion(date: NgbDate): number {
    return this.insertions.findIndex(element => element.day == date.day
      && element.month == date.month
      && element.year == date.year);
  }

  isSelected(date: NgbDate) {
    return this.findInsertion(date) != -1;
  }

  insertionMarkDisabled = (date: NgbDate, current: {month: number}) => {
    if (this.selectedScheme != this.customScheme && this.selectedScheme && this.selectedScheme.timeLimit) {
      let now = new Date();
      let last = new Date();
      now.setDate(now.getDate() - 1);
      last.setDate(last.getDate() + this.selectedScheme.timeLimit + 1);

      return date.before(new NgbDate(last.getFullYear(), last.getMonth() + 1, last.getDate()))
        && date.after(new NgbDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
    }

    return false;
  }

  fixSizes: FixSize[] = [];

  customSize: FixSize = { amount: -1, width: -1, length: -1 }

  selectedSize: FixSize;

  customSizeL = 0;
  customSizeW = 0;

  schemes: Scheme[] = [];

  customScheme: Scheme = { paid: 1, Free: 0, timeLimit: 0 }

  selectedScheme: Scheme;

  customPaid = 1;
  customFree = 0;

  get totalSpace() {
    if (this.selectedSize == this.customSize || this.selectedSize == null) {
      return this.customSizeL * this.customSizeW;
    }
    else return this.selectedSize.length * this.selectedSize.width;
  }

  get grossAmount() {
    if (this.selectedSize == this.customSize) {
      return (this.releaseorder.rate * this.totalSpace) * this.totalAds;
    }
    else {
      return this.selectedSize.amount * this.totalAds;
    }
  }

  get netAmount() {
    let amount = this.grossAmount;

    amount -= (this.releaseorder.publicationDiscount * amount / 100);
    amount -= (this.releaseorder.agencyDiscount1 * amount / 100);
    amount -= (this.releaseorder.agencyDiscount2 * amount / 100);

    return Math.ceil(amount);
  }

  adCountMultiplier = 0;

  get totalAds() {
    return this.adCountMultiplier * (this.selectedScheme == this.customScheme ? this.customPaid : this.selectedScheme.paid);
  }

  get availableAds() {
    return (this.selectedScheme == this.customScheme
      ? (this.customPaid + this.customFree) : (this.selectedScheme.paid + this.selectedScheme.Free))
      * this.adCountMultiplier;
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

    amount -= (this.releaseorder.publicationDiscount * amount / 100);

    return amount;
  }

  otherChargesTypes = ['Designing Charges', 'Extra Copy/Newspaper Charges', 'Certificate Charges'];

  paymentTypes = ['Cash', 'Cheque', 'NEFT'];

  addMediaHouse() {
    let obj = new DirMediaHouse();

    obj.orgName = this.mediaHouse.orgName ? this.mediaHouse.orgName : this.mediaHouse;
    obj.address.edition = this.releaseorder.publicationEdition;
    obj.address.state = this.releaseorder.publicationState;
    obj.GSTIN = this.releaseorder.publicationGSTIN;
    obj.mediaType = this.releaseorder.mediaType;

    this.mediaHouseApi.createMediaHouse(obj).subscribe(data => {
      // handle
    });
  }

  addClient() {
    let obj = new DirClient();

    obj.orgName = this.client.orgName ? this.client.orgName : this.client;
    obj.address.state = this.releaseorder.clientState;
    obj.gstNo = this.releaseorder.clientGSTIN;
    
    this.clientApi.createClient(obj).subscribe(data => {
      // handle
    });
  }
  
  addExecutive() {
    let obj = new DirExecutive();

    obj.executiveName = this.executive.executiveName ? this.executive.executiveName : this.executive;
    obj.orgName = this.releaseorder.executiveOrg;
    
    this.executiveApi.createExecutive(obj).subscribe(data => {
      // handle
    });
  }
}

class TaxValues
{
  constructor(public primary: number, public secondary = 0) {}
}
