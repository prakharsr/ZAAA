import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DialogService } from 'app/services';
import { UserCache } from 'app/guards/guard.service';

@Injectable()
export class CreateRoGuard implements CanActivate {

  constructor(private cache: UserCache,
    private dialog: DialogService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    const data = this.cache.current;

    if (!data.firm.name || !data.firm.registeredAddress) {
      this.dialog.showYesNo('Firm Profile not filled',
        'Firm profile needs to be filled before creating Release Order. Do you want to fill your Firm profile now?').subscribe(
          confirm => {
            if (confirm) {
              this.router.navigateByUrl('/firm');
            }
          }
        );

      return false;
    }
    
    return true;
  }
}
