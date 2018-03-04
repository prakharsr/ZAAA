import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanComponentDeactivate } from './canComponentDeactivate';
import { DialogService } from '../services/dialog.service';

@Injectable()
export class CanDeactiveGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor(private dialog: DialogService) { }

  canDeactivate(component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let result = component.canDeactivate ? component.canDeactivate() : true;

      if (!result) {
        return this.dialog.confirm("Discard changes?");
      }

      return true;
  }
}
