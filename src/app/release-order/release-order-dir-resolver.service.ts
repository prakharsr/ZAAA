import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ReleaseOrder } from '@aaman/releaseorder/release-order';
import { MediaHouse } from '@aaman/dir/media-houses/media-house';
import { Client } from '@aaman/dir/clients/client';
import { Executive } from '@aaman/dir/executives/executive';
import { ReleaseOrderApiService } from '@aaman/releaseorder/release-order-api.service';

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