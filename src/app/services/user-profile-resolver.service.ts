import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';
import { UserProfile } from '../models/user-profile';

@Injectable()
export class UserProfileResolver implements Resolve<UserProfile> {
  constructor(private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile> {
    return this.api.getUserProfile();
  }
}