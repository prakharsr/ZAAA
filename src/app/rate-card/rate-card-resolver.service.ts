import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { RateCard } from './rateCard';
import { RateCardApiService } from './rate-card-api.service';

@Injectable()
export class RateCardResolver implements Resolve<RateCard> {
  constructor(private api: RateCardApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RateCard> {
    let id = route.paramMap.get('id');

    return this.api.getRateCard(id).take(1).map(rateCard => {
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