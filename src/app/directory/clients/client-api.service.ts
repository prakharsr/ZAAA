import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirClient } from './dirClient';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClientApiService {

  constructor(private api: ApiService) { }

  createClient(client: DirClient) : Observable<any> {
    return this.api.post('/user/client', {
      organizationName: client.orgName,
      companyName: client.companyName,
      nickName: client.nickName,
      categoryType: client.category,
      addressState: client.address,
      landline: client.landLine,
      website: client.website,
      panNo: client.panNo,
      gstin: client.gstNo,
      contactPerson: {
        Name: client.contactPerson.name,
        Designation: client.contactPerson.designation,
        Department: client.contactPerson.department,
        MobileNo: client.contactPerson.mobileNo,
        EmailId: client.contactPerson.email,
        DateOfBirth: client.contactPerson.dob,
        Anniversary: client.contactPerson.anniversaryDate
      }
    });
  }

  private bodyToClient(data: any) : DirClient {
    let client = new DirClient();

    client.id = data._id;

    client.orgName = data.OrganizationName;
    client.companyName = data.CompanyName;
    client.nickName = data.NickName;
    client.category = data.CategoryType;
    client.address = data.AddressState;
    client.landLine = data.Landline;
    client.website = data.Website;
    client.panNo = data.PanNO;
    client.gstNo = data.GSTNo;
    
    if (data.ContactPerson) {
      let person = data.ContactPerson;

      client.contactPerson.name = person.Name;
      client.contactPerson.designation = person.Designation;
      client.contactPerson.department = person.Department;
      client.contactPerson.mobileNo = person.MobileNo;
      client.contactPerson.email = person.EmailId;
      client.contactPerson.dob = person.DateOfBirth;
      client.contactPerson.anniversaryDate = person.Anniversary;

      if (person.Photo) {
        client.contactPerson.photo = environment.uploadsBaseUrl + person.Photo;
      }
    }

    return client;
  }

  editClient(client: DirClient) : Observable<any> {
    return this.api.patch('/user/client', {
      id: client.id,
      OrganizationName: client.orgName,
      CompanyName: client.companyName,
      NickName: client.nickName,
      CategoryType: client.category,
      AddressState: client.address,
      Landline: client.landLine,
      Website: client.website,
      PanNO: client.panNo,
      GSTNo: client.gstNo,
      ContactPerson: {
        Name: client.contactPerson.name,
        Designation: client.contactPerson.designation,
        Department: client.contactPerson.department,
        MobileNo: client.contactPerson.mobileNo,
        EmailId: client.contactPerson.email,
        DateOfBirth: client.contactPerson.dob,
        Anniversary: client.contactPerson.anniversaryDate
      }
    });
  }

  getClient(id: string) : Observable<DirClient> {
    return this.api.get('/user/client/' + id).pipe(
      map(data => data.success ? this.bodyToClient(data.client) : new DirClient())
    );
  }

  getClients() : Observable<DirClient[]> {
    return this.api.get('/user/clients').pipe(
      map(data => {
        let clients : DirClient[] = [];

        if (data.success) {
          data.clients.forEach(element => {
            clients.push(this.bodyToClient(element));            
          });
        }

        return clients;
      })
    );
  }

  deleteClient(client: DirClient) : Observable<any> {
    return this.api.delete('/user/client/' + client.id);
  }

  uploadProfilePicture(id: string, fileToUpload: File) : Observable<any> {
    return this.api.fileUpload("/user/client/picture/" + id, "client", fileToUpload);
  }
}
