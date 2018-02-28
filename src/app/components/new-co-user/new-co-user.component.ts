import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoUser } from '../../models/coUser';
import { ApiService } from '../../services/api.service';
import { UserRoles } from '../../models/userRoles';

@Component({
  selector: 'app-new-co-user',
  templateUrl: './new-co-user.component.html',
  styleUrls: ['./new-co-user.component.css']
})
export class NewCoUserComponent implements OnInit {

  name: string;
  email: string;
  phone: string;
  password: string;
  cpassword: string;
  roles = new UserRoles();


  @Output() done = new EventEmitter<CoUser>();
  @Output() cancel = new EventEmitter<boolean>();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  submit() {
    this.api.createCoUser(this.name, this.email, this.phone, this.password).subscribe(
      data => {
        if (data.success)
        {
          let coUser = new CoUser(this.name, this.email, this.phone);

          coUser.id = data.msg;

          this.done.emit(coUser);
        }
      }
    );
  }

  onCancel() {
    this.cancel.emit(false);
  }
}
