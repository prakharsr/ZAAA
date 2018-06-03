import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit() {
    // if(this.api.isLoggedIn)
    // {
    //   this.router.navigateByUrl('profile');
    // }
  }

}
