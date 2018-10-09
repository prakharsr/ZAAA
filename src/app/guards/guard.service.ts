import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { ApiService, DialogService } from 'app/services';
import { Observable } from 'rxjs/Observable';
import { UserProfile, Firm, Plan } from 'app/models';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { DialogComponent } from '../components/dialog/dialog.component';

export class UserCacheDetails {
  user: UserProfile;
  firm: Firm;
  plan: Plan;
  rawFirm: any;
}

@Injectable()
export class UserCache {
  constructor(private api: ApiService) { }

  get(): Observable<UserCacheDetails> {
    let diff;

    if (this.timestamp) {
      diff = (new Date().getTime() - this.timestamp.getTime()) / 1000 / 60;
    }

    if (this.timestamp == null || diff > 1) {
      return this.api.getUserCheck().pipe(
        map(data => {
          if (data.success) {
            this.user = data.user;
            this.firm = data.firm;
            this.plan = data.plan;
            this.rawFirm = data.rawFirm;
          }
          else {
            this.user = null;
            this.firm = null;
            this.plan = null;
            this.rawFirm = null;
          }

          return {
            user: this.user,
            firm: this.firm,
            plan: this.plan,
            rawFirm: this.rawFirm
          };
        })
      );
    }
    else return of();
  }

  private timestamp?: Date;
  private user: UserProfile;
  private firm: Firm;
  private rawFirm: any;
  private plan: Plan;

  get current(): UserCacheDetails {
    return {
      user: this.user,
      firm: this.firm,
      plan: this.plan,
      rawFirm: this.rawFirm
    }
  }
}

@Injectable()
export class Guard implements CanActivate, CanActivateChild {

  constructor(private api: ApiService,
    private cache: UserCache,
    private router: Router,
    private dialog: DialogService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    return this.can(route, state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    return this.can(route, state);
  }

  private can(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    return this.cache.get().pipe(
      map((data: UserCacheDetails) => {
        if (!this.isLoggedIn(data)) {
          if (this.api.isLoggedIn) {
            this.api.logout();
          }

          this.goToLogin();
    
          return false;
        }

        if (route.data.verifyMobile) {
          return true;
        }
    
        if (!this.isMobileVerified(data)) {
          this.goToMobileVerify();
    
          return false;
        }

        if (route.data.plan) {
          return true;
        }

        if (!this.isPlanValid(data)) {
          this.goToPlan();

          return false;
        }

        if (route.data.admin && !data.user.isAdmin) {
          this.dialog.show(DialogComponent, {
            data: {
              title: 'Access Denied',
              message: 'Admin permission is required to access this page.',
              ok: true
            }
          }).subscribe();

          return false;
        }
    
        return true;
      }
    ));
  }

  private isLoggedIn(data: UserCacheDetails) {
    return data.user != null;
  }

  private isMobileVerified(data: UserCacheDetails) {
    return data.user != null && data.user.contact && data.user.mobileVerified;
  }

  private isPlanValid(data: UserCacheDetails) {
    return data.firm != null && data.plan != null;
  }

  private goToLogin() {
    this.router.navigateByUrl('/login');
  }

  private goToMobileVerify() {
    this.router.navigateByUrl('/verify/mobile');
  }

  private goToPlan() {
    this.router.navigateByUrl('/plan');
  }
}
