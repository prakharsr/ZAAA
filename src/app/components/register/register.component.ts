import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  state: number = 0;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() { }

  NextState() : void {
    ++this.state;
  }

  GoToDashboard() : void {
    this.router.navigateByUrl('dashboard');
  }
}
