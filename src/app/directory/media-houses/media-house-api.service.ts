import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, elementAt } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ApiService } from 'app/services';
import { MediaHouse, MediaHouseScheduling } from './media-house';
import { PageData } from 'app/models';

@Injectable()
export class MediaHouseApiService {

  constructor(private api: ApiService) { }

  createMediaHouse(mediaHouse: MediaHouse) : Observable<any> {
    return this.api.post('/user/mediahouse', this.createPostArgs(mediaHouse));
  }

  createPostArgs(mediaHouse: MediaHouse) {
    let scheduling = [];
    
    if (mediaHouse.scheduling) {
      mediaHouse.scheduling.forEach(element => scheduling.push(this.schedulingToBody(element)));
    }

    return {
      pullouts: mediaHouse.pullouts,
      organizationName: mediaHouse.orgName,
      publicationName: mediaHouse.pubName,
      nickName: mediaHouse.nickName,
      mediaType: mediaHouse.mediaType,
      address: mediaHouse.address,
      officeLandline: mediaHouse.officeLandLine,
      officeStdNo: mediaHouse.officeStdNo,
      scheduling: scheduling,
      GSTIN: mediaHouse.GSTIN,
      Remark: mediaHouse.Remark,
      Language: mediaHouse.Language
    };
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

  bodyToMediaHouse(body: any) : MediaHouse {
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
    mediaHouse.Remark = body.Remark;
    mediaHouse.Language = body.Language;

    let scheduling : MediaHouseScheduling[] = [];

    if (body.Scheduling) {
      body.Scheduling.forEach(element => {
        scheduling.push(this.bodyToScheduling(element));
      });
    }

    mediaHouse.scheduling = scheduling;
    
    if(body.pullouts) {
      mediaHouse.pullouts = body.pullouts;
    }

    return mediaHouse;
  }

  editMediaHouse(mediaHouse: MediaHouse) : Observable<any> {
    return this.api.patch('/user/mediahouse/', this.editPostArgs(mediaHouse));
  }

  editPostArgs(mediaHouse: MediaHouse) {
    let scheduling = [];

    if (mediaHouse.scheduling) {
      mediaHouse.scheduling.forEach(element => scheduling.push(this.schedulingToBody(element)));
    }
    
    return {
      id: mediaHouse.id,
      pullouts: mediaHouse.pullouts,
      OrganizationName: mediaHouse.orgName,
      PublicationName: mediaHouse.pubName,
      NickName: mediaHouse.nickName,
      MediaType: mediaHouse.mediaType,
      Address: mediaHouse.address,
      OfficeLandline: mediaHouse.officeLandLine,
      officeStdNo: mediaHouse.officeStdNo,
      GSTIN: mediaHouse.GSTIN,
      Scheduling: scheduling,
      Remark: mediaHouse.Remark,
      Language: mediaHouse.Language
    };
  }

  getMediaHouse(id: string) : Observable<MediaHouse> {
    return this.api.get('/user/mediahouse/' + id).pipe(
      map(data => data.success ? this.bodyToMediaHouse(data.mediahouse) : null)
    );
  }

  getMediaHouses(page: number, global: boolean = false) : Observable<PageData<MediaHouse>> {
    return this.api.get((global ? '/user/mediahouses/global/' : '/user/mediahouses/') + page).pipe(
      map(data => {
        let mediaHouses : MediaHouse[] = [];

        if (data.success) {
          data.mediahouses.forEach(element => {
            mediaHouses.push(this.bodyToMediaHouse(element));            
          });
        }

        return new PageData<MediaHouse>(mediaHouses, data.perPage, data.page, data.pageCount);
      })
    );
  }

  searchMediaHouses(query: string) : Observable<MediaHouse[]> {
    if (query) {
      return this.api.get('/user/mediahouses/search/' + query).pipe(
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

  searchMediaHousesByEdition(query: string, mediaHouseName: string) : Observable<MediaHouse[]> {
    if (query && mediaHouseName) {
      return this.api.get('/user/mediahouses/search/' + mediaHouseName + "/" + query).pipe(
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
