import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  private goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

    console.log('admin guard');

    return this.api.getUser().pipe(
      map(data => {
        const result = data.success && data.user.isAdmin;

        if (!result) {
          this.goToDashboard();
        }

        return result;
      },
      catchError(err => {
        this.goToDashboard();

        return of(false);
      }))
    );
  }
}
