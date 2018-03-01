import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

@Injectable()
export class PhoneVerifyGuardService implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    return this.api.getUser().pipe(
      map(data => {
        const result = data.success && data.user.phone && data.user.mobile_verified;

        if (!result) {
          this.router.navigateByUrl('/verify/mobile');
        }

        return result;
      })
    );
  }
}
