import { Component, OnInit } from '@angular/core';
import { DirMediaHouse } from '../../models/dirMediaHouse';

@Component({
  selector: 'app-dir-media-house',
  templateUrl: './dir-media-house.component.html',
  styleUrls: ['./dir-media-house.component.css']
})
export class DirMediaHouseComponent implements OnInit {

  mediaHouse = new DirMediaHouse();
  error: string;
  success: string;

  constructor() { }

  ngOnInit() {
  }

  submit() {}

}
