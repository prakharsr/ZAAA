import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  state: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  PrevState() : void
  {
    --this.state;
  }

  NextState() : void
  {
    ++this.state;

    //this.api.state = this.state;
  }
}
