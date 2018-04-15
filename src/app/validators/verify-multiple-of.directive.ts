import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[verify-multiple-of]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerifyMultipleOfDirective, multi: true}]
})
export class VerifyMultipleOfDirective implements Validator {

  @Input('verify-multiple-of') multipleOf: number;

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value && control.value % this.multipleOf != 0) {
      return {'multipleOf': {value: control.value}};
    }

    return null;
  }

}
