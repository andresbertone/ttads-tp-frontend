import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  showError(
    title: string,
    message: string,
    cancelButtonMessage: string,
    confirmButtonMessage: string,
    showCancelButton: boolean
  ) {
    this.dialog.open(DialogComponent, {
      data: {
        icon: 'error',
        title,
        message,
        cancelButtonMessage,
        confirmButtonMessage,
        showCancelButton
      },
    });
  }

  showWarning(
    title: string,
    message: string,
    cancelButtonMessage: string,
    confirmButtonMessage: string,
    showCancelButton: boolean
  ) {
    return this.dialog.open(DialogComponent, {
      data: {
        icon: 'warning',
        title,
        message,
        cancelButtonMessage,
        confirmButtonMessage,
        showCancelButton
      }
    });
  }
}
