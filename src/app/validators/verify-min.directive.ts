import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[verify-min]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerifyMinDirective, multi: true}]
})
export class VerifyMinDirective implements Validator {

  @Input('verify-min') min: number;

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value && control.value < this.min) {
      return {'min': {value: control.value}};
    }

    return null;
  }

}
