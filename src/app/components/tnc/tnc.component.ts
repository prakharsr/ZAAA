import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.css']
})
export class TncComponent implements OnInit {

  jurisdiction = "";

  ro = ["", "", "", "", ""];
  invoice = ["", "", "", "", ""];
  pr = ["", "", "", "", ""];
  advance = ["", "", ""];

  constructor() { }

  ngOnInit() {
    if (!this.jurisdiction) {
      this.jurisdiction = "All disputes";
    }
  }

  submit () {}
}
