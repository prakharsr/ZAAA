import { Component, OnInit } from '@angular/core';
import { DirClient } from '../dirClient';

@Component({
  selector: 'app-dir-client',
  templateUrl: './dir-client.component.html',
  styleUrls: ['./dir-client.component.css']
})
export class DirClientComponent implements OnInit {

  client = new DirClient();
  error: string;
  success: string;

  constructor() { }

  ngOnInit() {
  }

  submit () {
  }

}
