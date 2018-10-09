import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { DialogService } from 'app/services';
import { UserCache } from 'app/guards/guard.service';
import { DialogComponent } from '../components';

@Injectable()
export class AccountsGuard implements CanActivateChild {

  constructor(private cache: UserCache,
    private dialog: DialogService,
    private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    const canAccounts = this.cache.current.canAccounts;

    if (!canAccounts) {
      this.dialog.show(DialogComponent, {
        data: {
          ok: true,
          title: 'Access Denied',
          message: 'You don\'t have Accounts permission'
        }
      }).subscribe();

      return false;
    }
    
    return true;
  }
}
