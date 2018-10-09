import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { DialogService } from 'app/services';
import { UserCache } from 'app/guards/guard.service';
import { DialogComponent } from '../components';

@Injectable()
export class RoGuard implements CanActivateChild {

  constructor(private cache: UserCache,
    private dialog: DialogService,
    private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    if (this.cache.current.roLevel < 1) {
      this.dialog.show(DialogComponent, {
        data: {
          ok: true,
          title: 'Access Denied',
          message: 'You don\'t have Release Order permission'
        }
      }).subscribe();

      return false;
    }
    
    return true;
  }
}
