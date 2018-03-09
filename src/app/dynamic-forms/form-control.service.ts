import { Injectable } from '@angular/core';
import { FieldBase } from './fields';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class FormControlService {

  constructor() { }

  toFormGroup(fields: FieldBase<any>[]) {
    let group: any = [];

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
        : new FormControl(field.value || '')
    })

    return new FormGroup(group);
  }

}
