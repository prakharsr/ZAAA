import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

const emailRegex = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,63}$/;

@Directive({
  selector: '[verify-email]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerifyEmailDirective, multi: true}]
})
export class VerifyEmailDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value && !emailRegex.test(control.value)) {
      return {'email': {value: control.value}};
    }

    return null;
  }

}
