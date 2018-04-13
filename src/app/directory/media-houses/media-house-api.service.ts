import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { MediaHouse, MediaHouseScheduling, Pullout } from './media-house';
import { map, elementAt } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MediaHouseApiService {

  constructor(private api: ApiService) { }

  createMediaHouse(mediaHouse: MediaHouse) : Observable<any> {
    let scheduling = [];
    let pullouts = [];


    if (mediaHouse.scheduling) {
      mediaHouse.scheduling.forEach(element => scheduling.push(this.schedulingToBody(element)));
    }

    if (mediaHouse.pullouts) {
      mediaHouse.pullouts.forEach(element => pullouts.push(element.name));
    }

    return this.api.post('/user/mediahouse', {
      pullouts: pullouts,
      organizationName: mediaHouse.orgName,
      publicationName: mediaHouse.pubName,
      nickName: mediaHouse.nickName,
      mediaType: mediaHouse.mediaType,
      address: mediaHouse.address,
      officeLandline: mediaHouse.officeLandLine,
      officeStdNo: mediaHouse.officeStdNo,
      scheduling: scheduling,
      GSTIN: mediaHouse.GSTIN,
      frequency: {
        Period: mediaHouse.freqPeriod,
        Remark: mediaHouse.freqRemark
      },
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

  private bodyToMediaHouse(body: any) : MediaHouse {
    let mediaHouse = new MediaHouse();

    mediaHouse.id = body._id;
    mediaHouse.global = body.global;

    mediaHouse.orgName = body.OrganizationName;
    mediaHouse.pubName = body.PublicationName;
    mediaHouse.nickName = body.NickName;
    mediaHouse.mediaType = body.MediaType;
    mediaHouse.address = body.Address;
    mediaHouse.officeLandLine = body.OfficeLandline;
    mediaHouse.officeStdNo = body.officeStdNo;
    mediaHouse.GSTIN = body.GSTIN;

    if (body.Frequency) {
      let freq : {Period: string, Remark: string} = body.Frequency;

      mediaHouse.freqPeriod = freq.Period;
      mediaHouse.freqRemark = freq.Remark;
    }

    let scheduling : MediaHouseScheduling[] = [];

    if (body.Scheduling) {
      body.Scheduling.forEach(element => {
        scheduling.push(this.bodyToScheduling(element));
      });
    }

    mediaHouse.scheduling = scheduling;
    
    if(body.pullouts) {
      body.pullouts.forEach(element => {
        mediaHouse.pullouts.push(new Pullout(element));
      })
    }

    return mediaHouse;
  }

  editMediaHouse(mediaHouse: MediaHouse) : Observable<any> {
    let scheduling = [];
    let pullouts = [];
   
    if (mediaHouse.scheduling) {
      mediaHouse.scheduling.forEach(element => scheduling.push(this.schedulingToBody(element)));
    }
    
    if (mediaHouse.pullouts) {
      mediaHouse.pullouts.forEach(element => pullouts.push(element.name));
    }
    
    return this.api.patch('/user/mediahouse/', {
      id: mediaHouse.id,
      pullouts: pullouts,
      OrganizationName: mediaHouse.orgName,
      PublicationName: mediaHouse.pubName,
      NickName: mediaHouse.nickName,
      MediaType: mediaHouse.mediaType,
      Address: mediaHouse.address,
      OfficeLandline: mediaHouse.officeLandLine,
      officeStdNo: mediaHouse.officeStdNo,
      GSTIN: mediaHouse.GSTIN,
      
      Frequency: {
        Period: mediaHouse.freqPeriod,
        Remark: mediaHouse.freqRemark
      },

      Scheduling: scheduling
    })
  }

  getMediaHouse(id: string) : Observable<MediaHouse> {
    return this.api.get('/user/mediahouse/' + id).pipe(
      map(data => data.success ? this.bodyToMediaHouse(data.mediahouse) : null)
    );
  }

  getMediaHouses(global: boolean = false) : Observable<MediaHouse[]> {
    return this.api.get(global ? '/user/mediahouses/global' : '/user/mediahouses').pipe(
      map(data => {
        let mediaHouses : MediaHouse[] = [];

        if (data.success) {
          data.mediahouses.forEach(element => {
            mediaHouses.push(this.bodyToMediaHouse(element));            
          });
        }

        return mediaHouses;
      })
    );
  }

  searchMediaHouses(query: string) : Observable<MediaHouse[]> {
    if (query) {
      return this.api.get('/user/mediahouses/' + query).pipe(
        map(data => {
          let mediaHouses : MediaHouse[] = [];

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

  deleteMediaHouse(mediaHouse: MediaHouse) : Observable<any> {
    return this.api.delete('/user/mediahouse/' + mediaHouse.id);
  }

}
