import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PlanGuardService implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  private goToPlan() {
    this.router.navigateByUrl('/plan');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {\

    console.log('plan guard');

    return this.api.getFirm().pipe(
      map(data => {
        const result = data.success && data.firm.plan != null;

        if (!result) {
          this.goToPlan();
        }

        return result;
      }),
      catchError(err => {
        this.goToPlan();

        return of(false);
      }));
  }
}
