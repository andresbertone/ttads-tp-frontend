import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 5000
  };

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, action = 'Close') {
    this.snackBar.open(msg, action, this.snackBarConfig);
  }
}
