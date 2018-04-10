import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDeletion(msg: string) : Observable<boolean> {
    return this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: msg,
        ok: true,
        cancel: true
      }
    }).afterClosed();
  }
}
