import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firm } from '../../models';

@Component({
  selector: 'app-accounts-home',
  templateUrl: './accounts-home.component.html',
  styleUrls: ['./accounts-home.component.css']
})
export class AccountsHomeComponent implements OnInit {

  firm: Firm;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { firm: Firm }) => {
      this.firm = data.firm;
    });
  }

}
