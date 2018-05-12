import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Client } from './client';
import { ClientApiService } from './client-api.service';
import { ClientPage } from './client-page';

@Injectable()
export class ClientListResolver implements Resolve<ClientPage> {
  constructor(private api: ClientApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClientPage> {
    let page: any = route.paramMap.get('page');

    return this.api.getClients(page).map(client => {
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