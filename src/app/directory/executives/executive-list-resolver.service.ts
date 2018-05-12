
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Executive } from './executive';
import { ExecutiveApiService } from './executive-api.service';
import { ExecutivePage } from './executive-page';

@Injectable()
export class ExecutiveListResolver implements Resolve<ExecutivePage> {
  constructor(private api: ExecutiveApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExecutivePage> {
    let page: any = route.paramMap.get('page');

    return this.api.getExecutives(page).map(client => {
      if (client) {
        return client;
      }
      else { // id not found
        this.router.navigateByUrl('/dir/executives');
        return null;
      }
    });
  }
} 