import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { ApiService } from 'app/services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    if (this.api.isLoggedIn) {
      return true;
    }

    let url = state.url;

    this.router.navigateByUrl('/login');

    return true;
  }
}
