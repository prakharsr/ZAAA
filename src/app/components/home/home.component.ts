import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

}
