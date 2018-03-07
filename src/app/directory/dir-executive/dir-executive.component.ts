import { Component, OnInit } from '@angular/core';
import { DirExecutive } from '../../models/dirExecutive';

@Component({
  selector: 'app-dir-executive',
  templateUrl: './dir-executive.component.html',
  styleUrls: ['./dir-executive.component.css']
})
export class DirExecutiveComponent implements OnInit {

  executive = new DirExecutive();
  error: string;
  success: string;
  
  constructor() { }

  ngOnInit() {
  }

}
