import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirMediaHouse, MediaHouseScheduling } from './dirMediaHouse';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MediaHouseApiService {

  constructor(private api: ApiService) { }

  createMediaHouse(mediaHouse: DirMediaHouse) : Observable<any> {
    let scheduling = [];

    mediaHouse.scheduling.forEach(element => scheduling.push(this.schedulingToBody(element)));

    return this.api.post('/user/mediahouse', {
      organizationName: mediaHouse.orgName,
      publicationName: mediaHouse.pubName,
      nickName: mediaHouse.nickName,
      mediaType: mediaHouse.mediaType,
      address: mediaHouse.address,
      officeLandline: mediaHouse.officeLandLine,
      scheduling: scheduling,
      GSTIN: mediaHouse.GSTIN
    });
  }

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

    mediaHouse.id = body._id;
    mediaHouse.global = body.global;

    mediaHouse.orgName = body.OrganizationName;
    mediaHouse.pubName = body.PublicationName;
    mediaHouse.nickName = body.NickName;
    mediaHouse.mediaType = body.MediaType;
    mediaHouse.address = body.Address;
    mediaHouse.officeLandLine = body.OfficeLandline;
    mediaHouse.GSTIN = body.GSTIN;

    let scheduling : MediaHouseScheduling[] = [];

    if (body.Scheduling) {
      body.Scheduling.forEach(element => {
        scheduling.push(this.bodyToScheduling(element));
      });
    }

    mediaHouse.scheduling = scheduling;

    return mediaHouse;
  }

  editMediaHouse(mediaHouse: DirMediaHouse) : Observable<any> {
    let scheduling = [];

    if (mediaHouse.scheduling) {
      mediaHouse.scheduling.forEach(element => scheduling.push(this.schedulingToBody(element)));
    }

    return this.api.patch('/user/mediahouse/', {
      id: mediaHouse.id,

      OrganizationName: mediaHouse.orgName,
      PublicationName: mediaHouse.pubName,
      NickName: mediaHouse.nickName,
      MediaType: mediaHouse.mediaType,
      Address: mediaHouse.address,
      OfficeLandline: mediaHouse.officeLandLine,
      GSTIN: mediaHouse.GSTIN,

      Scheduling: scheduling
    })
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

  searchMediaHouses(query: string) : Observable<DirMediaHouse[]> {
    if (query) {
      return this.api.get('/user/mediahouses/' + query).pipe(
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

    return of([]);
  }

  deleteMediaHouse(mediaHouse: DirMediaHouse) : Observable<any> {
    return this.api.delete('/user/mediahouse/' + mediaHouse.id);
  }

}
