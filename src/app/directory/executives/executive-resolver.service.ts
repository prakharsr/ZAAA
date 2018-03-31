import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DirExecutive } from './dirExecutive';
import { ExecutiveApiService } from './executive-api.service';

@Injectable()
export class ExecutiveResolver implements Resolve<DirExecutive> {
  constructor(private api: ExecutiveApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DirExecutive> {
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