import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Executive } from './executive';
import { ExecutiveApiService } from './executive-api.service';

@Injectable()
export class ExecutiveResolver implements Resolve<Executive> {
  constructor(private api: ExecutiveApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Executive> {
    let id = route.paramMap.get('id');

    return this.api.getExecutive(id).take(1).map(executive => {
      if (executive) {
        return executive;
      }
      else { // id not found
        this.router.navigateByUrl('/dir/executives');
        return null;
      }
    });
  }
}