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
    this.api.getState().subscribe(
      data => this.state = data
    );
  }

  prev() {
    --this.state;
  }

  next() {
    ++this.state;
  }

  NextState() : void
  {
    ++this.state;

    this.api.setState(this.state);
  }
}
