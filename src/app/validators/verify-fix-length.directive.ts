import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[verify-length]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerifyLengthDirective, multi: true}]
})
export class VerifyLengthDirective implements Validator {

  @Input('verify-fix-length') length: number;

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value) {
      let text: string = control.value;

      if (text.length != this.length) {
        return {'length': {value: control.value}};
      }
    }

    return null;
  }

}
