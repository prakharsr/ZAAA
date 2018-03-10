import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirClient } from './dirClient';
import { DirExecutive } from './dirExecutive';
import { DirMediaHouse } from './dirMediaHouse';
import { map } from 'rxjs/operators';

@Injectable()
export class DirApiService {

  constructor(private api: ApiService) { }

  createClient(client: DirClient) : Observable<any> {
    return this.api.post('/user/client', this.clientToBody(client));
  }

  private clientToBody(client: DirClient) {
    return {
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
    }
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

      client.contactPerson.photo = person.Photo;
    }

    return client;
  }

  editClient(client: DirClient) : Observable<any> {
    let body = this.clientToBody(client);

    body['id'] = client.id;

    return this.api.patch('/user/client', body);
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

  deleteExecutive(executive: DirExecutive) : Observable<any> {
    return this.api.delete('/user/executive/' + executive.id);
  }

  deleteMediaHouse(mediaHouse: DirMediaHouse) : Observable<any> {
    return this.api.delete('/user/mediahouse/' + mediaHouse.id);
  }

}
