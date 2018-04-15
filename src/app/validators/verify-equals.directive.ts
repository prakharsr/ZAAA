import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[verify-equals]',
  providers: [{provide: NG_VALIDATORS, useExisting: VerifyEqualsDirective, multi: true}]
})
export class VerifyEqualsDirective implements Validator {

  @Input('verify-equals') equals: string;

  validate(control: AbstractControl): {[key: string]: any} {
    if (control.value) {
      let text: string = control.value;

      if (text != this.equals) {
        return {'equals': {value: control.value}};
      }
    }

    return null;
  }

}
