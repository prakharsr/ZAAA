import { Component, OnInit } from '@angular/core';
import { RateCard, FixSize, Scheme, Premium, Covered, Remark } from '../../models/rateCard';

@Component({
  selector: 'app-create-rate-card',
  templateUrl: './create-rate-card.component.html',
  styleUrls: ['./create-rate-card.component.css']
})
export class CreateRateCardComponent implements OnInit {

  constructor() { }

  rateCard = new RateCard();

  ngOnInit() {
    this.rateCard.fixSizes = [new FixSize()];
    this.rateCard.schemes = [new Scheme()];
    this.rateCard.premiums = [new Premium()];
    this.rateCard.covered = [new Covered()];
    this.rateCard.remarks = [new Remark()];
  }

  get mediaTypes() {
    return ['Print', 'Air', 'Electronic'];
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

  get rateCardTypes() {
    return ['Regional', 'Corporate', 'Local'];
  }

  get periods() {
    return ['Daily', 'Weekly', 'BiWeekly', 'Monthly'];
  }

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
}
