import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CoUser } from '@aaman/couser/co-user';
import { CoUserApiService } from '@aaman/couser/co-user-api.service';

@Injectable()
export class CoUsersResolver implements Resolve<CoUser[]> {
  constructor(private api: CoUserApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CoUser[]> {
    return this.api.coUsers;
  }
}