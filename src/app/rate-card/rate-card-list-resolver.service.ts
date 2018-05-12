
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RateCardPage } from './rate-card-page';
import { RateCardApiService } from './rate-card-api.service';

@Injectable()
export class RateCardListResolver implements Resolve<RateCardPage> {
  constructor(private api: RateCardApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RateCardPage> {
    let page: any = route.paramMap.get('page');

    return this.api.getRateCards(page).map(rateCard => {
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