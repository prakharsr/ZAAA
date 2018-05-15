import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RateCardApiService } from './rate-card-api.service';
import { PageData } from '../models/page-data';
import { RateCard } from './rate-card';

@Injectable()
export class RateCardListResolver implements Resolve<PageData<RateCard>> {
  constructor(private api: RateCardApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageData<RateCard>> {
    let page: any = route.paramMap.get('page');
    let global: any = route.data.global;

    return this.api.getRateCards(page, global).map(rateCard => {
      if (rateCard) {
        return rateCard;
      }
      else { // id not found
        this.router.navigateByUrl('/ratecards');
        return null;
      }
    });
  }
} 