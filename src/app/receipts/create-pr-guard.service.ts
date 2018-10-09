import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DialogService } from 'app/services';
import { UserCache } from 'app/guards/guard.service';
import { DialogComponent } from '../components';

@Injectable()
export class CreatePrGuard implements CanActivate {

  constructor(private cache: UserCache,
    private dialog: DialogService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    const data = this.cache.current;

    // User should have PR create permission
    if (data.prLevel < 2) {
      this.dialog.show(DialogComponent, {
        data: {
          ok: true,
          title: 'Access Denied',
          message: 'You don\'t have permission to create Payment Receipt.'
        }
      }).subscribe();

      return false;
    }
    
    return true;
  }
}
