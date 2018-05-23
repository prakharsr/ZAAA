import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MediaHouse } from './media-house';
import { MediaHouseApiService } from './media-house-api.service';

@Injectable()
export class MediaHouseResolver implements Resolve<MediaHouse> {
  constructor(private api: MediaHouseApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MediaHouse> {
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