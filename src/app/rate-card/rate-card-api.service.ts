import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RateCard, FixSize, Remark } from './rateCard';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RateCardApiService {

  constructor(private api: ApiService) { }

  createRateCard(rateCard: RateCard): Observable<any> {
    let fixSizes = [],
      schemes = [],
      premiums = [],
      covered = [],
      tax = [];

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
      remarks: rateCard.remarks,
      covered: covered
    });
  }

  private bodyToRateCard(body: any): RateCard {
    let rateCard = new RateCard();

    rateCard.id = body._id;
    rateCard.global = body.global;

    rateCard.mediaType = body.MediaType;
    rateCard.adType = body.AdType;
    rateCard.rateCardType = body.RateCardType;

    if (body.BookingCenter) {
      let bookingCenter : {MediaHouseName: string, Edition: string, PulloutName: string} = body.BookingCenter;

      rateCard.mediaHouseName = bookingCenter.MediaHouseName;
      rateCard.bookingEdition = bookingCenter.Edition;
      rateCard.pullOutName = bookingCenter.PulloutName;
    }

    if (body.Frequency) {
      let freq : {Period: string, Remark: string} = body.Frequency;

      rateCard.freqPeriod = freq.Period;
      rateCard.freqRemark = freq.Remark;
    }

    if (body.Category) {
      let cat = body.Category;

      rateCard.categories = [
        cat.SubCategory1,
        cat.SubCategory2,
        cat.SubCategory3,
        cat.SubCategory4,
        cat.SubCategory5,
        cat.SubCategory6
      ];
    }

    if (body.Rate) {
      let rate : {rateQuantity: number, unit: string} = body.Rate;

      rateCard.rate = rate.rateQuantity;
      rateCard.unit = rate.unit;
    }

    rateCard.position = body.Position;
    rateCard.hue = body.Hue;

    if (body.MaxSizeLimit) {
      let size : {Length: number, Width: number} = body.MaxSizeLimit;

      rateCard.maxLength = size.Length;
      rateCard.maxWidth = size.Width;
    }

    if (body.MinSizeLimit) {
      let size : {Length: number, Width: number} = body.MinSizeLimit;

      rateCard.minLength = size.Length;
      rateCard.minWidth = size.Width;
    }

    if (body.FixSize) {
      let fixSizes : {Width: number, Length: number, Amount: number}[] = body.FixSize;

      fixSizes.forEach(element => {
        rateCard.fixSizes.push({
          amount: element.Amount,
          width: element.Width,
          length: element.Length
        });
      });
    }

    if (body.Scheme) {
      let schemes : {paid: number, Free: number, TimeLimit: number}[] = body.Scheme;

      schemes.forEach(element => {
        rateCard.schemes.push({
          paid: element.paid,
          Free: element.Free,
          timeLimit: element.TimeLimit
        });
      });
    }

    if (body.Premium) {
      let premiums : {Type: string, Amount: number}[] = body.Premium;

      premiums.forEach(element => {
        rateCard.premiums.push({
          premType: element.Type,
          premAmount: element.Amount
        });
      });
    }

    if (body.Tax) {
      let tax : {Included: boolean, TaxRate: number}[] = body.Tax;

      tax.forEach(element => {
        rateCard.taxes.push({
          included: element.Included,
          rate: element.TaxRate
        });
      });
    }

    body.validFrom = body.ValidFrom;
    body.validTill = body.ValidTill;

    if (body.Covered) {
      let covered : {mediaHouse: string, EditionArea: string}[] = body.Covered;

      covered.forEach(element => {
        rateCard.covered.push({
          covMediaHouse: element.mediaHouse,
          covEdition: element.EditionArea
        });
      });
    }

    if (body.Remarks) {
      rateCard.remarks = body.Remarks;
    }

    return rateCard;
  }

  deleteRateCard(rateCard: RateCard): Observable<any> {
    return this.api.delete('/user/ratecard/' + rateCard.id);
  }

  getRateCard(id: string): Observable<RateCard> {
    return this.api.get('/user/ratecard/' + id).pipe(
      map(data => data.success ? this.bodyToRateCard(data.ratecard) : null)
    );
  }

  getRateCards(global: boolean = false) : Observable<RateCard[]> {
    return this.api.get(global ? '/user/ratecards/global' : '/user/ratecards').pipe(
      map(data => {
        let ratecards : RateCard[] = [];

        if (data.success) {
          data.ratecards.forEach(element => {
            ratecards.push(this.bodyToRateCard(element));
          });
        }

        return ratecards;
      })
    );
  }

  searchRateCards(query: string) : Observable<RateCard[]> {
    if (query) {
      return this.api.get('/user/ratecards/' + query).pipe(
        map(data => {
          let ratecards : RateCard[] = [];

          if (data.success) {
            data.ratecards.forEach(element => {
              ratecards.push(this.bodyToRateCard(element));
            });
          }

          return ratecards;
        })
      );
    }
    
    return of([]);
  }

  editRateCard(rateCard: RateCard): Observable<any> {
    let fixSizes = [],
      schemes = [],
      premiums = [],
      covered = [],
      tax = [];

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

    return this.api.patch('/user/ratecard', {
      id: rateCard.id,
      MediaType: rateCard.mediaType,
      AdType: rateCard.adType,
      RateCardType: rateCard.rateCardType,
      BookingCenter: {
        MediaHouseName: rateCard.mediaHouseName,
        Edition: rateCard.bookingEdition,
        PulloutName: rateCard.pullOutName
      },
      Frequency: {
        Period: rateCard.freqPeriod,
        Remark: rateCard.freqRemark
      },
      Categories: {
        SubCategory1: rateCard.categories[0],
        SubCategory2: rateCard.categories[1],
        SubCategory3: rateCard.categories[2],
        SubCategory4: rateCard.categories[3],
        SubCategory5: rateCard.categories[4],
        SubCategory6: rateCard.categories[5],
      },
      Rate: {
        rateQuantity: rateCard.rate,
        unit: rateCard.unit,
        // Unit Quantity
      },
      Position: rateCard.position,
      Hue: rateCard.hue,
      MaxSizeLimit: {
        Length: rateCard.maxLength,
        Width: rateCard.maxWidth
      },
      MinSizeLimit: {
        Length: rateCard.minLength,
        Width: rateCard.minWidth
      },
      FixSize: fixSizes,
      Scheme: schemes,
      Premium: premiums,
      Tax: tax,
      ValidFrom: rateCard.validFrom,
      ValidTill: rateCard.validTill,
      Remarks: rateCard.remarks,
      Covered: covered
    });
  }

  searchMediaHouseNames(query: string) : Observable<string[]> {
    return this.api.get('/user/mediahouses/' + query).pipe(
      map(data => {
        let mediaHouseNames : string[] = [];

        if (data.success && data.mediahouses) {
          data.mediahouses.forEach(element => {
            mediaHouseNames.push(element.OrganizationName);
          });
        }

        return mediaHouseNames;
      })
    );
  }
}
