import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-debit-notes',
  templateUrl: './credit-debit-notes.component.html',
  styleUrls: ['./credit-debit-notes.component.css']
})
export class CreditDebitNotesComponent implements OnInit {

  mediaHouseNote = false;
  clientNote = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { mediaHouseNote: boolean, clientNote: boolean }) => {
      this.mediaHouseNote = data.mediaHouseNote;
      this.clientNote = data.clientNote;
    });
  }

}
