import { Component, OnInit, Input, Output } from '@angular/core';
import { UserRoles } from '../../models/userRoles';

@Component({
  selector: 'app-role-control',
  templateUrl: './role-control.component.html',
  styleUrls: ['./role-control.component.css']
})
export class RoleControlComponent implements OnInit {

  @Input() @Output() roles = new UserRoles();

  constructor() { }

  ngOnInit() {
  }

}
