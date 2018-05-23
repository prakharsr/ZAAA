import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Invoice } from './invoice';
import { InvoiceApiService } from './invoice-api.service';

@Injectable()
export class InvoiceResolver implements Resolve<Invoice> {
  constructor(private api: InvoiceApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invoice> {
    let id = route.paramMap.get('id');

    return this.api.getInvoice(id).take(1).map(invoice => {
      if (invoice) {
        return invoice;
      }
      else { // id not found
        this.router.navigateByUrl('/invoices');
        return null;
      }
    });
  }
}