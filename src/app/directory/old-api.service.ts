import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirExecutive } from './executives/dirExecutive';
import { DirMediaHouse } from './media-houses/dirMediaHouse';
import { map } from 'rxjs/operators';

@Injectable()
export class OldApiService {

  constructor(private api: ApiService) { }

  deleteExecutive(executive: DirExecutive) : Observable<any> {
    return this.api.delete('/user/executive/' + executive.id);
  }

  deleteMediaHouse(mediaHouse: DirMediaHouse) : Observable<any> {
    return this.api.delete('/user/mediahouse/' + mediaHouse.id);
  }

}
