import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { DirClient, ContactPerson } from './dirClient';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClientApiService {

  constructor(private api: ApiService) { }

  createClient(client: DirClient) : Observable<any> {
    let contactPersons = [];

    client.contactpersons.forEach(element => contactPersons.push(this.contactPersonToBody(element)));

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
      contactPerson: contactPersons
    });
  }

  private bodyToContactPerson(body: any) : ContactPerson {
    return {
      name: body.Name,
      designation: body.Designation,
      department: body.Department,
      mobileNo: body.MobileNo,
      email: body.EmailId,
      dob: body.DateOfBirth,
      anniversaryDate: body.Anniversary,
      photo: body.Photo,
      personLandLine: body.Landline
    };
  }

  private contactPersonToBody(contactPerson: ContactPerson) {
    return {
      Name: contactPerson.name,
      Designation: contactPerson.designation,
      Department: contactPerson.department,
      MobileNo: contactPerson.mobileNo,
      EmailId: contactPerson.email,
      DateOfBirth: contactPerson.dob,
      Anniversary: contactPerson.anniversaryDate,
      Photo: contactPerson.photo,
      Landline: contactPerson.personLandLine
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

    let contactPersons : ContactPerson[] = [];

    if (data.ContactPerson) {
      data.ContactPerson.forEach(element => {
        contactPersons.push(this.bodyToContactPerson(element));
      });
    }

    client.contactpersons = contactPersons;

    return client;
  }

  editClient(client: DirClient) : Observable<any> {
    let contactPersons = [];

    client.contactpersons.forEach(element => contactPersons.push(this.contactPersonToBody(element)));

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
      ContactPerson: contactPersons
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
