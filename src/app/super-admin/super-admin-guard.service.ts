import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SuperAdminApiService } from './super-admin-api.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {

  constructor(private api: SuperAdminApiService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    if (this.api.isLoggedIn) {
      return true;
    }

    this.router.navigateByUrl('/superadmin/login');

    return true;
  }
}
