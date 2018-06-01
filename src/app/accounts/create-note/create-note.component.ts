import { Component, OnInit } from '@angular/core';
import { CreditDebitNote } from '../credit-debit-note';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  mediaHouseNote = false;
  clientNote = false;

  note = new CreditDebitNote();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { mediaHouseNote: boolean, clientNote: boolean }) => {
      this.mediaHouseNote = data.mediaHouseNote;
      this.clientNote = data.clientNote;
    });
  }

  goBack() { }

  cancel() {
    this.goBack();
  }

  submit() { }

}
