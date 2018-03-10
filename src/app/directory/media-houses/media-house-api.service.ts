import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirMediaHouse, MediaHouseScheduling } from './dirMediaHouse';
import { map } from 'rxjs/operators';

@Injectable()
export class MediaHouseApiService {

  constructor(private api: ApiService) { }

  private bodyToScheduling(body: any) : MediaHouseScheduling {
    let scheduling = new MediaHouseScheduling();
    
    scheduling.person = body.Person;
    scheduling.designation = body.Designation;
    scheduling.mobileNo = body.MobileNo;
    scheduling.deskExtension = body.DeskExtension;
    scheduling.email = body.EmailId;

    return scheduling;
  }

  private schedulingToBody(scheduling: MediaHouseScheduling) {
    return {
      Person: scheduling.person,
      Designation: scheduling.designation,
      MobileNo: scheduling.mobileNo,
      DeskExtension: scheduling.deskExtension,
      EmailId: scheduling.email
    };
  }

  private bodyToMediaHouse(body: any) : DirMediaHouse {
    let mediaHouse = new DirMediaHouse();

    mediaHouse.orgName = body.OrganizationName;
    mediaHouse.pubName = body.PublicationName;
    mediaHouse.nickName = body.NickName;
    mediaHouse.mediaType = body.MediaType;
    mediaHouse.edition = body.Edition;
    mediaHouse.address = body.Address;
    mediaHouse.officeLandLine = body.OfficeLandline;

    if (body.Scheduling) {
      let scheduling : MediaHouseScheduling[] = [];

      body.Scheduling.forEach(element => {
        scheduling.push(this.bodyToScheduling(element));
      });

      mediaHouse.scheduling = scheduling;
    }

    return mediaHouse;
  }

  getMediaHouse(id: string) : Observable<DirMediaHouse> {
    return this.api.get('/user/mediahouse/' + id).pipe(
      map(data => data.success ? this.bodyToMediaHouse(data.mediahouse) : null)
    );
  }

  getMediaHouses(global: boolean = false) : Observable<DirMediaHouse[]> {
    return this.api.get(global ? '/user/mediahouses/global' : '/user/mediahouses').pipe(
      map(data => {
        let mediaHouses : DirMediaHouse[] = [];

        if (data.success) {
          data.mediahouses.forEach(element => {
            mediaHouses.push(this.bodyToMediaHouse(element));            
          });
        }

        return mediaHouses;
      })
    );
  }

  deleteMediaHouse(mediaHouse: DirMediaHouse) : Observable<any> {
    return this.api.delete('/user/mediahouse/' + mediaHouse.id);
  }

}
