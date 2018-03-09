import { Component, OnInit, Input } from '@angular/core';
import { FieldBase } from '../fields';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css']
})
export class DynamicFieldComponent implements OnInit {

  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get showError() {
    const control = this.form.controls[this.field.key];

    return control.invalid && (control.dirty || control.touched);
  }

}
