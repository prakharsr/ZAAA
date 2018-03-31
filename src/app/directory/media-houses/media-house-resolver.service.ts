import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { DirMediaHouse } from './dirMediaHouse';
import { MediaHouseApiService } from './media-house-api.service';

@Injectable()
export class MediaHouseResolver implements Resolve<DirMediaHouse> {
  constructor(private api: MediaHouseApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DirMediaHouse> {
    let id = route.paramMap.get('id');

    return this.api.getMediaHouse(id).take(1).map(mediahouse => {
      if (mediahouse) {
        return mediahouse;
      }
      else { // id not found
        this.router.navigateByUrl('/dir/media_houses');
        return null;
      }
    });
  }
}