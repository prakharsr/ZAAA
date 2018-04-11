import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[verify-max]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerifyMaxDirective, multi: true}]
})
export class VerifyMaxDirective implements Validator {

  @Input('verify-max') max: number;

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value && control.value > this.max) {
      return {'max': {value: control.value}};
    }

    return null;
  }

}
