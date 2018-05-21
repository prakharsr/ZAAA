import { Component, OnInit } from '@angular/core';
import { ApiService } from '@aaman/main/api.service';

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
