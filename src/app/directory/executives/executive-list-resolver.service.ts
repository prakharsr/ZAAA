import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Executive } from './executive';
import { PageData } from 'app/models';
import { ExecutiveApiService } from './executive-api.service';

@Injectable()
export class ExecutiveListResolver implements Resolve<PageData<Executive>> {
  constructor(private api: ExecutiveApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageData<Executive>> {
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