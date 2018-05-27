import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserProfile } from 'app/models';
import { ApiService } from './api.service';

@Injectable()
export class FirmUsersResolver implements Resolve<UserProfile[]> {
  constructor(private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile[]> {
    return this.api.getFirmUsers();
  }
}