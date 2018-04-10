import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackbar: MatSnackBar) { }

  show(message: string) {
    this.snackbar.open(message, "Dismiss", {
      horizontalPosition: 'right',
      duration: 3000
    });
  }

}
