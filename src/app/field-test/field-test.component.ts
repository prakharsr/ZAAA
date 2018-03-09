import { Component, OnInit } from '@angular/core';
import { FieldBase, TextField } from '../dynamic-forms/fields';

@Component({
  selector: 'app-field-test',
  templateUrl: './field-test.component.html',
  styleUrls: ['./field-test.component.css']
})
export class FieldTestComponent implements OnInit {

  fields: FieldBase<any>[] = [
    new TextField<string>("nam", "Hello", "", true),
    new TextField<string>("nsd", "Second", "", false)
  ];

  constructor() { }

  ngOnInit() {
  }

}
