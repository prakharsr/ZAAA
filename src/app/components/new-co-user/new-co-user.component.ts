import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoUser } from '../../models/coUser';

@Component({
  selector: 'app-new-co-user',
  templateUrl: './new-co-user.component.html',
  styleUrls: ['./new-co-user.component.css']
})
export class NewCoUserComponent implements OnInit {

  email: string;
  phone: string;
  password: string;
  cpassword: string;

  @Output() done = new EventEmitter<CoUser>();
  @Output() cancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.done.emit(new CoUser(this.email, this.phone));
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
