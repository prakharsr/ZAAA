import { Component, OnInit } from '@angular/core';
import { RateCard, FixSize, Scheme, Premium, Covered, Remark, Category, Tax } from '../rateCard';
import { RateCardApiService } from '../rate-card-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-rate-card',
  templateUrl: './create-rate-card.component.html',
  styleUrls: ['./create-rate-card.component.css']
})
export class CreateRateCardComponent implements OnInit {

  edit = false;
  id: string;

  others = "Others";

  dropdownPullOutName: string;
  customPullOutName: string;

  constructor(private api: RateCardApiService, private route: ActivatedRoute, private router: Router) { }

  rateCard = new RateCard();
  selectedCategories: Category[] = [null, null, null, null, null, null];
  error: string;

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
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');

        this.edit = true;

        this.api.getRateCard(this.id).subscribe(data => {
          this.rateCard = data;

          this.dropdownPullOutName = this.others;
          this.customPullOutName = this.rateCard.pullOutName;

          // reconstruct selected categories
        });
      }
      else if (params.has('copy')) {
        this.api.getRateCard(params.get('copy')).subscribe(data => {
          this.rateCard = data;
        })
      }
      else this.initNew();
    });
  }

  private goBack() {
    this.router.navigateByUrl(this.edit ? '/ratecards/' + this.id : '/ratecards');
  }

  mediaTypes = ['Print', 'Air', 'Electronic'];

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

    result.push('Sqcm');
    result.push('sec');

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

          this.error = data.msg;
        }
      },
      err => {
        console.log(err);

        this.error = 'Connection failed';
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
    this.rateCard.categories = [];

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
