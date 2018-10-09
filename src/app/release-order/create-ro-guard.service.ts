import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DialogService } from 'app/services';
import { UserCache } from 'app/guards/guard.service';
import { DialogComponent } from '../components';

@Injectable()
export class CreateRoGuard implements CanActivate {

  constructor(private cache: UserCache,
    private dialog: DialogService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

    const data = this.cache.current;

    // Firm profile needs to be filled
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

    // Firm status must be approved
    if (data.rawFirm.FirmStatus) {
      let status = data.rawFirm.FirmStatus;

      this.dialog.show(DialogComponent, {
        data: {
          ok: true,
          title: status == 1 ? 'Firm on Hold' : 'Form Blocked',
          message: status == 1 ? 'Your Firm is on Hold' : 'Your Firm is Blocked. Contact Admin.'
        }
      }).subscribe();

      return false;
    }

    // User should have RO create permission
    if (data.roLevel < 2) {
      this.dialog.show(DialogComponent, {
        data: {
          ok: true,
          title: 'Access Denied',
          message: 'You don\'t have permission to create Release Order.'
        }
      }).subscribe();

      return false;
    }
    
    return true;
  }
}
