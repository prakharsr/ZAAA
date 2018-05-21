import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from '@aaman/main/api.service';

@Injectable()
export class PlanGuard implements CanActivate {

  constructor(private api: ApiService,
    private router: Router) { }

  private goToPlan() {
    this.router.navigateByUrl('/plan');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

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
