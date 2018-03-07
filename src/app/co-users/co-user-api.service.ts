import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs/Observable';
import { UserRoles } from './userRoles';
import { CoUser } from './coUser';

import { map } from 'rxjs/operators/map';

@Injectable()
export class CoUserApiService {

  constructor(private api: ApiService) { }

  get coUsers() : Observable<any> {
    return this.api.get('/user/co_user');
  }

  createCoUser(name: string, designation: string, email: string, phone: string) : Observable<any> {
    return this.api.post('/user/co_user', {
      name: name,
      designation: designation,
      email: email,
      phone: phone
    });
  }

  getRoles(coUserId: string) : Observable<UserRoles> {
    let base = this.api.get('/user/role/' + coUserId);

    return base.pipe(
      map(data => {
        let roles = new UserRoles();

        if (data.success) {
          roles.release_order = data.msg.Release_order;
          roles.invoice = data.msg.Invoice;
          roles.payment_receipts = data.msg.Payment_receipts;
          roles.accounts = data.msg.Accounts;
        }

        return roles;
      })
    );
  }

  setRoles(coUserId : string, roles : UserRoles) : Observable<any> {
    return this.api.post('/user/role', { 
      id: coUserId,
      release_order: roles.release_order,
      invoice: roles.invoice,
      payment_receipts: roles.payment_receipts,
      accounts: roles.accounts
    });
  }

  deleteCoUser(coUser: CoUser) : Observable<any> {
    return this.api.delete('/user/co_user/' + coUser.id);
  }

  getUser() : Observable<any> {
    return this.api.getUser();
  }

}
