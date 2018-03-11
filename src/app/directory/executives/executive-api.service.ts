import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirExecutive } from './dirExecutive';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ExecutiveApiService {

  constructor(private api: ApiService) { }

  createExecutive(executive: DirExecutive) : Observable<any> {
    return this.api.post('/user/executive', {
      organizationName: executive.orgName,
      companyName: executive.companyName,
      executiveName: executive.executiveName,
      designation: executive.designation,
      department: executive.department,
      mobileNo: executive.mobileNo,
      email: executive.email,
      dob: executive.dob,
      anniversary: executive.anniversaryDate
    });
  }

  private bodyToExecutive(body: any) : DirExecutive {
    let executive = new DirExecutive();

    executive.id = body._id;

    executive.orgName = body.OrganizationName;
    executive.companyName = body.CompanyName;
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

    return executive;
  }

  getExecutive(id: string) : Observable<DirExecutive> {
    return this.api.get('/user/executive/' + id).pipe(
      map(data => data.success ? this.bodyToExecutive(data.executive) : new DirExecutive())
    );
  }

  getExecutives() : Observable<DirExecutive[]> {
    return this.api.get('/user/executives').pipe(
      map(data => {
        let executives : DirExecutive[] = [];

        if (data.success) {
          data.executives.forEach(element => {
            executives.push(this.bodyToExecutive(element));            
          });
        }

        return executives;
      })
    );
  }

  editExecutive(executive: DirExecutive) : Observable<any> {
    return this.api.patch('/user/executive', {
      id: executive.id,
      OrganizationName: executive.orgName,
      CompanyName: executive.companyName,
      ExecutiveName: executive.executiveName,
      Designation: executive.designation,
      Department: executive.department,
      MobileNo: executive.mobileNo,
      EmailId: executive.mobileNo,
      DateOfBirth: executive.dob,
      Anniversary: executive.anniversaryDate
    });
  }

  deleteExecutive(executive: DirExecutive) : Observable<any> {
    return this.api.delete('/user/executive/' + executive.id);
  }

  uploadProfilePicture(id: string, fileToUpload: File) : Observable<any> {
    return this.api.fileUpload("/user/executive/picture/" + id, "executive", fileToUpload);
  }

}
