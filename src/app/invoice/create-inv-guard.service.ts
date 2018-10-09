import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DialogService } from 'app/services';
import { UserCache } from 'app/guards/guard.service';
import { DialogComponent } from '../components';

@Injectable()
export class CreateInvGuard implements CanActivate {

  constructor(private cache: UserCache,
    private dialog: DialogService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    const data = this.cache.current;

    // User should have Invoice create permission
    if (data.invLevel < 2) {
      this.dialog.show(DialogComponent, {
        data: {
          ok: true,
          title: 'Access Denied',
          message: 'You don\'t have permission to create Invoice.'
        }
      }).subscribe();

      return false;
    }
    
    return true;
  }
}
