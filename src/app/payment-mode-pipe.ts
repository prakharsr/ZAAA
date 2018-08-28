import {PipeTransform, Pipe} from "@angular/core";

@Pipe({ name: 'paymentMode'})
export class PaymentModePipe implements PipeTransform  {
  constructor() {}
  transform(value) {
    switch (value) {
      case "Cheque":
        return "Cheque / DD";

      case "NEFT":
        return "NEFT / IMPS";

      default:
        return value;
    }
  }
}