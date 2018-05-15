import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs/Observable';
import { Client, ContactPerson } from './client';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { PageData } from '../../models/page-data';

@Injectable()
export class ClientApiService {

  constructor(private api: ApiService) { }

  createClient(client: Client) : Observable<any> {
    let contactPersons = [];

    client.contactpersons.forEach(element => contactPersons.push(this.contactPersonToBody(element)));

    return this.api.post('/user/client', {
      organizationName: client.orgName,
      companyName: client.companyName,
      nickName: client.nickName,
      categoryType: client.category,
      SubCategoryType: client.SubCategoryType,
      address: client.address,
      landline: client.landLine,
      stdNo: client.stdNo,
      website: client.website,
      panNo: client.panNo,
      GSTIN: client.GSTIN,
      contactPerson: contactPersons,
      Remark: client.Remark,
      IncorporationDate: client.IncorporationDate
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
      personLandLine: body.Landline,
      personStdNo: body.stdNo
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
      Landline: contactPerson.personLandLine,
      stdNo: contactPerson.personStdNo
    }
  }

  private bodyToClient(data: any) : Client {
    let client = new Client();

    client.id = data._id;

    client.orgName = data.OrganizationName;
    client.companyName = data.CompanyName;
    client.nickName = data.NickName;
    client.category = data.CategoryType;
    client.SubCategoryType = data.SubCategoryType;
    client.address = data.Address;
    client.landLine = data.Landline;
    client.stdNo = data.stdNo;
    client.website = data.Website;
    client.panNo = data.PanNO;
    client.GSTIN = data.GSTIN;
    client.Remark = data.Remark;
    client.IncorporationDate = data.IncorporationDate;

    let contactPersons : ContactPerson[] = [];

    if (data.ContactPerson) {
      data.ContactPerson.forEach(element => {
        contactPersons.push(this.bodyToContactPerson(element));
      });
    }

    client.contactpersons = contactPersons;

    return client;
  }

  editClient(client: Client) : Observable<any> {
    let contactPersons = [];

    client.contactpersons.forEach(element => contactPersons.push(this.contactPersonToBody(element)));

    return this.api.patch('/user/client', {
      id: client.id,
      OrganizationName: client.orgName,
      CompanyName: client.companyName,
      NickName: client.nickName,
      CategoryType: client.category,
      SubCategoryType: client.SubCategoryType,
      Address: client.address,
      Landline: client.landLine,
      stdNo: client.stdNo,
      Website: client.website,
      PanNO: client.panNo,
      GSTIN: client.GSTIN,
      ContactPerson: contactPersons,
      Remark: client.Remark,
      IncorporationDate: client.IncorporationDate
    });
  }

  getClient(id: string) : Observable<Client> {
    return this.api.get('/user/client/' + id).pipe(
      map(data => data.success ? this.bodyToClient(data.client) : null)
    );
  }

  getClients(page: number) : Observable<PageData<Client>> {
    return this.api.get('/user/clients/' + page).pipe(
      map(data => {
        let clients : Client[] = [];

        if (data.success) {
          data.clients.forEach(element => {
            clients.push(this.bodyToClient(element));            
          });
        }

        return new PageData<Client>(clients, data.perPage, data.page, data.pageCount);
      })
    );
  }

  searchClients(query: string) : Observable<Client[]> {
    if (query) {
      return this.api.get('/user/clients/search/' + query).pipe(
        map(data => {
          let clients : Client[] = [];

          if (data.success) {
            data.clients.forEach(element => {
              clients.push(this.bodyToClient(element));            
            });
          }

          return clients;
        })
      );
    }
    
    return of([]);
  }

  deleteClient(client: Client) : Observable<any> {
    return this.api.delete('/user/client/' + client.id);
  }

  uploadProfilePicture(id: string, fileToUpload: File) : Observable<any> {
    return this.api.fileUpload("/user/client/picture/" + id, "client", fileToUpload);
  }
}
