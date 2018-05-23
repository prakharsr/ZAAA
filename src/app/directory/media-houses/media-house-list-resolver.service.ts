import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MediaHouse } from './media-house';
import { PageData } from 'app/models';
import { MediaHouseApiService } from './media-house-api.service';

@Injectable()
export class MediaHouseListResolver implements Resolve<PageData<MediaHouse>> {
  constructor(private api: MediaHouseApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageData<MediaHouse>> {
    let page: any = route.paramMap.get('page');
    let global: any = route.data.global;

    return this.api.getMediaHouses(page, global).map(mediaHouse => {
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