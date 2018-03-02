import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PhoneVerifyGuardService implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  private goToMobileVerify() {
    this.router.navigateByUrl('/verify/mobile');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    console.log('phone guard');

    return this.api.getUser().pipe(
      map(data => {
        const result = data.success && data.user.phone && data.user.mobile_verified;

        if (!result) {
          this.goToMobileVerify();
        }

        return result;
      },
      catchError(err => {
        this.goToMobileVerify();

        return of(false);
      }))
    );
  }
}
