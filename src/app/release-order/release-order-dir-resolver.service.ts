import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrder } from './release-order';
import { ReleaseOrderApiService } from './release-order-api.service';
import { Executive } from '../directory/executives/executive';
import { Client } from '../directory/clients/client';
import { MediaHouse } from '../directory/media-houses/media-house';

export class ReleaseOrderDir {
  releaseorder: ReleaseOrder;
  mediaHouse: MediaHouse;
  client: Client;
  executive: Executive;
}

@Injectable()
export class ReleaseOrderDirResolver implements Resolve<ReleaseOrderDir> {
  constructor(private api: ReleaseOrderApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReleaseOrderDir> {
    let id = route.paramMap.get(route.paramMap.has('copy') ? 'copy' : 'id');

    return this.api.getReleaseOrderDir(id).take(1).map(releaseorder => {
      if (releaseorder) {
        return releaseorder;
      }
      else {
        return null;
      }
    });
  }
}