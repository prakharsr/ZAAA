import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Executive } from '../directory/executives/executive';
import { Client } from '../directory/clients/client';
import { MediaHouse } from '../directory/media-houses/media-house';
import { Invoice } from './invoice';
import { InvoiceApiService } from './invoice-api.service';

export class InvoiceDir {
  invoice: Invoice;
  mediaHouse: MediaHouse;
  client: Client;
  executive: Executive;
}

@Injectable()
export class InvoiceDirResolver implements Resolve<InvoiceDir> {
  constructor(private api: InvoiceApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InvoiceDir> {
    let id = route.paramMap.get(route.paramMap.has('copy') ? 'copy' : 'id');

    return this.api.getInvoiceDir(id).take(1).map(invoice => {
      if (invoice) {
        return invoice;
      }
      else {
        return null;
      }
    });
  }
}