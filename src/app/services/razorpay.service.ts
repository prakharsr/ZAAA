import { Injectable } from '@angular/core';
import { WindowService } from './window.service';
import { environment } from 'environments/environment';

@Injectable()
export class RazorPayService {

    constructor(private windowService: WindowService) {
    }

    public initPay(number: string,
      email: string,
      amountInRupees: number,
      purchaseDescription: string,
      callback: any): void {

      let options = {
        key: environment.razorPay,
        amount: amountInRupees * 100,
        name: "ZAAA",
        description: purchaseDescription,
        prefill: {
          email: email,
          contact: number
        },
        theme: {
          color: "#f37254"
        },
        handler: callback
      };

      let rzp = new this.windowService.window.Razorpay(options);
      rzp.open();
    }
}