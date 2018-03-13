import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RateCard, FixSize } from './rateCard';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RateCardApiService {

  constructor(private api: ApiService) { }

  createRateCard(rateCard: RateCard): Observable<any> {
    let fixSizes = [],
      schemes = [],
      premiums = [],
      covered = [],
      tax = [],
      remarks: string[] = [];

    rateCard.fixSizes.forEach(element => {
      fixSizes.push({
        Width: element.width,
        Length: element.length,
        Amount: element.amount
      });
    });

    rateCard.schemes.forEach(element => {
      schemes.push({
        paid: element.paid,
        Free: element.Free,
        TimeLimit: element.timeLimit
      });
    });

    rateCard.premiums.forEach(element => {
      premiums.push({
        Type: element.premType,
        Amount: element.premAmount
      });
    });

    rateCard.covered.forEach(element => {
      covered.push({
        mediaHouse: element.covMediaHouse,
        EditionArea: element.covEdition
      });
    });

    rateCard.taxes.forEach(element => {
      tax.push({
        Included: element.included,
        TaxRate: element.rate
      });
    });

    rateCard.remarks.forEach(element => {
      remarks.push(element.remark);
    });

    return this.api.post('/user/ratecard', {
      mediaType: rateCard.mediaType,
      adType: rateCard.adType,
      rateCardType: rateCard.rateCardType,
      bookingCenter: {
        MediaHouseName: rateCard.mediaHouseName,
        Edition: rateCard.bookingEdition,
        PulloutName: rateCard.pullOutName
      },
      frequency: {
        Period: rateCard.freqPeriod,
        Remark: rateCard.freqRemark
      },
      categories: {
        SubCategory1: rateCard.categories[0],
        SubCategory2: rateCard.categories[1],
        SubCategory3: rateCard.categories[2],
        SubCategory4: rateCard.categories[3],
        SubCategory5: rateCard.categories[4],
        SubCategory6: rateCard.categories[5],
      },
      rate: {
        rateQuantity: rateCard.rate,
        unit: rateCard.unit,
        // Unit Quantity
      },
      position: rateCard.position,
      hue: rateCard.hue,
      maxSizeLimit: {
        Length: rateCard.maxLength,
        Width: rateCard.maxWidth
      },
      minSizeLimit: {
        Length: rateCard.minLength,
        Width: rateCard.minWidth
      },
      fixSize: fixSizes,
      scheme: schemes,
      premium: premiums,
      tax: tax,
      validFrom: rateCard.validFrom,
      validTill: rateCard.validTill,
      remark: remarks,
      covered: covered
    });
  }
}
