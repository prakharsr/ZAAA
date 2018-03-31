import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DirClient } from './dirClient';
import { ClientApiService } from './client-api.service';

@Injectable()
export class ClientResolver implements Resolve<DirClient> {
  constructor(private api: ClientApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DirClient> {
    let id = route.paramMap.get('id');

    return this.api.getClient(id).take(1).map(client => {
      if (client) {
        return client;
      }
      else { // id not found
        this.router.navigateByUrl('/dir/clients');
        return null;
      }
    });
  }
}