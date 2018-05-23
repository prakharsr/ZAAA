import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from 'app/services';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private api: ApiService,
    private router: Router) { }

  private goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {

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
