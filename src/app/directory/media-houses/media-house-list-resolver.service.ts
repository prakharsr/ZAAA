import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MediaHousePage } from './media-house-page';
import { MediaHouseApiService } from './media-house-api.service';

@Injectable()
export class MediaHouseListResolver implements Resolve<MediaHousePage> {
  constructor(private api: MediaHouseApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MediaHousePage> {
    let page: any = route.paramMap.get('page');

    return this.api.getMediaHouses(page).map(mediaHouse => {
      if (mediaHouse) {
        return mediaHouse;
      }
      else { // id not found
        this.router.navigateByUrl('/dir/media_houses');
        return null;
      }
    });
  }
} 