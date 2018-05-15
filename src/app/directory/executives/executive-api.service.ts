import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Executive } from './executive';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { PageData } from '../../models/page-data';

@Injectable()
export class ExecutiveApiService {

  constructor(private api: ApiService) { }

  createExecutive(executive: Executive) : Observable<any> {
    return this.api.post('/user/executive', {
      organizationName: executive.orgName,
      executiveName: executive.executiveName,
      designation: executive.designation,
      department: executive.department,
      mobileNo: executive.mobileNo,
      email: executive.email,
      dob: executive.dob,
      anniversary: executive.anniversaryDate,
      Remark: executive.Remark
    });
  }

  private bodyToExecutive(body: any) : Executive {
    let executive = new Executive();

    executive.id = body._id;

    executive.orgName = body.OrganizationName;
    executive.executiveName = body.ExecutiveName;
    executive.designation = body.Designation;
    executive.department = body.Department;
    executive.mobileNo = body.MobileNo;
    executive.email = body.EmailId;

    if (body.Photo) {
      executive.photo = environment.uploadsBaseUrl + body.Photo;
    }

    executive.dob = body.DateOfBirth;
    executive.anniversaryDate = body.Anniversary;

    executive.Remark = body.Remark;

    return executive;
  }

  getExecutive(id: string) : Observable<Executive> {
    return this.api.get('/user/executive/' + id).pipe(
      map(data => data.success ? this.bodyToExecutive(data.executive) : null)
    );
  }

  getExecutives(page: number) : Observable<PageData<Executive>> {
    return this.api.get('/user/executives/' + page).pipe(
      map(data => {
        let executives : Executive[] = [];

        if (data.success) {
          data.executives.forEach(element => {
            executives.push(this.bodyToExecutive(element));            
          });
        }

        return new PageData<Executive>(executives, data.perPage, data.page, data.pageCount);
      })
    );
  }

  searchExecutives(query: string) : Observable<Executive[]> {
    if (query) {
      return this.api.get('/user/executives/search/' + query).pipe(
        map(data => {
          let executives : Executive[] = [];

          if (data.success) {
            data.executives.forEach(element => {
              executives.push(this.bodyToExecutive(element));            
            });
          }

          return executives;
        })
      );
    }
    
    return of([]);
  }

  searchExecutivesByOrg(org: string, query: string) : Observable<Executive[]> {
    if (query) {
      return this.api.get('/user/executives/search/' + org + '/' + query).pipe(
        map(data => {
          let executives : Executive[] = [];

          if (data.success) {
            data.executives.forEach(element => {
              executives.push(this.bodyToExecutive(element));     
            });
          }

          return executives;
        })
      );
    }

    return of([]);
  }

  editExecutive(executive: Executive) : Observable<any> {
    return this.api.patch('/user/executive', {
      id: executive.id,
      OrganizationName: executive.orgName,
      ExecutiveName: executive.executiveName,
      Designation: executive.designation,
      Department: executive.department,
      MobileNo: executive.mobileNo,
      EmailId: executive.email,
      DateOfBirth: executive.dob,
      Anniversary: executive.anniversaryDate,
      Remark: executive.Remark
    });
  }

  deleteExecutive(executive: Executive) : Observable<any> {
    return this.api.delete('/user/executive/' + executive.id);
  }

  uploadProfilePicture(id: string, fileToUpload: File) : Observable<any> {
    return this.api.fileUpload("/user/executive/picture/" + id, "executive", fileToUpload);
  }

}
