import { Component, OnInit } from '@angular/core';
import { RateCard, FixSize, Scheme, Premium, Covered, Remark, Category, Tax } from '../rate-card';
import { RateCardApiService } from '../rate-card-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
import { MediaHouseApiService } from '../../directory/media-houses/media-house-api.service';
import { MediaHouse } from '../../directory/media-houses/media-house';
import { NotificationService } from '../../services/notification.service';

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
  customPullOutName: string;

  constructor(private api: RateCardApiService,
    private route: ActivatedRoute,
    private router: Router,
    private mediaHouseApi: MediaHouseApiService,
    private notifications: NotificationService) { }

  rateCard = new RateCard();
  selectedCategories: Category[] = [null, null, null, null, null, null];

  private initNew() {
    this.rateCard.fixSizes = [new FixSize()];
    this.rateCard.schemes = [new Scheme()];
    this.rateCard.premiums = [new Premium()];
    this.rateCard.covered = [new Covered()];
    this.rateCard.remarks = [new Remark()];
    this.rateCard.taxes = [new Tax()];

    this.mediaType = this.mediaTypes[0];
    this.rateCard.rateCardType = this.rateCardTypes[0];
    this.rateCard.freqPeriod = this.periods[0];
    this.rateCard.unit = this.units[0];
    this.rateCard.position = this.positions[0];
    this.rateCard.hue = this.hues[0];
  }

  private initEdit(data: RateCard) {
    if (data) {
      this.rateCard = data;

      this.dropdownPullOutName = this.others;
      this.customPullOutName = this.rateCard.pullOutName;

      this.buildCategoryTree();
    }
  }

  private buildCategoryTree() {
    let c : Category = this.categories.find(p => p.name == this.rateCard.categories[0]);

    if (c) {
      this.category1 = c;

      let i = 1;

      while (i < this.rateCard.categories.length && c.subcategories.length > 0) {
        c = c.subcategories.find(p => p.name == this.rateCard.categories[i]);

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

  mediaHouse;

  searchMediaHouse = (text: Observable<string>) => {
    return text.debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => this.mediaHouseApi.searchMediaHouses(term))
      .catch(() => of([]));
  }
  
  mediaHouseInputFormatter = (result: MediaHouse) => {
    this.rateCard.bookingEdition = result.address.edition;
    
    return result.orgName;
  }
  
  mediaHouseResultFormatter = (result: MediaHouse) => result.orgName + " - " + result.address.edition;

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
  }

  private goBack() {
    this.router.navigateByUrl(this.edit ? '/ratecards/' + this.id : '/ratecards');
  }

  mediaTypes = ['Print', 'Air', 'Electronic'];

  hues = ['Colored', 'Black & White'];

  get mediaType() {
    return this.rateCard.mediaType;
  }

  set mediaType(mediaType: string) {
    this.rateCard.mediaType = mediaType;

    this.rateCard.adType = this.adTypes[0];
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

  rateCardTypes = ['Regional', 'Corporate', 'Local'];

  periods = ['Daily', 'Weekly', 'BiWeekly', 'Monthly'];

  get units() {
    let result = [];

    if (this.rateCard.adType == 'Text Classified') {
      result.push('Words');
    }
    else result.push(this.rateCard.mediaType == 'Print' ? 'Sqcm' : 'sec');

    return result;
  }

  get positions() {
    let result = ['Classified', 'Back Page', 'Jacket', 'Prime Time'];

    for (let i = 1; i <= 8; ++i) {
      result.push('Page ' + i);
    }

    return result;
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

  addFixSize() {
    this.rateCard.fixSizes.push(new FixSize());
  }

  removeFixSize(i: number) {
    this.rateCard.fixSizes.splice(i, 1);
  }

  addScheme(){
    this.rateCard.schemes.push(new Scheme());
  }

  removeScheme(i: number){
    this.rateCard.schemes.splice(i, 1);
  }

  addPremium() {
    this.rateCard.premiums.push(new Premium());
  }

  removePremium(i: number) {
    this.rateCard.premiums.splice(i, 1);
  }

  addCovered() {
    this.rateCard.covered.push(new Covered());
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
    this.api.createRateCard(this.rateCard).subscribe(
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

  private editRateCard() {
    this.api.editRateCard(this.rateCard).subscribe(
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
    this.rateCard.categories = [];

    this.rateCard.mediaHouseName = this.mediaHouse.orgName ? this.mediaHouse.orgName : this.mediaHouse;

    this.selectedCategories.forEach(element => {
      if (element) {
        this.rateCard.categories.push(element.name);
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
