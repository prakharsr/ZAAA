import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserProfile } from '@aaman/main/user-profile';
import { ApiService } from '@aaman/main/api.service';

@Injectable()
export class UserProfileResolver implements Resolve<UserProfile> {
  constructor(private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile> {
    return this.api.getUserProfile();
  }
}