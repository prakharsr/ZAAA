import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PaymentReceipt } from '@aaman/receipts/payment-receipt';
import { ReceiptsApiService } from '@aaman/receipts/receipts-api.service';

@Injectable()
export class ReceiptResolver implements Resolve<PaymentReceipt> {
  constructor(private api: ReceiptsApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentReceipt> {
    let id = route.paramMap.get('id');

    return this.api.getReceipt(id).take(1).map(receipt => {
      if (receipt) {
        return receipt;
      }
      else { // id not found
        this.router.navigateByUrl('/receipts');
        return null;
      }
    });
  }
}