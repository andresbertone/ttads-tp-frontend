import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  getModalWarningMessage(model: any = {}, entityName: string = '', action: string = 'cancel') {
    if (action === 'cancel') {
      return `Are you sure you want to cancel the operation?`
    }

    if (entityName === 'spare part') {
      return `Are you sure you want to ${action} the ${entityName}: ${model.sparePartDescription}?`
    }
    
    return `Are you sure you want to ${action} ${entityName} ${model.firstName} ${model.lastName}?`
  }

  showError(
    title: string,
    messages: any[],
    cancelButtonMessage: string,
    confirmButtonMessage: string,
    showCancelButton: boolean
  ) {
    this.dialog.open(DialogComponent, {
      data: {
        icon: 'error',
        title,
        messages,
        cancelButtonMessage,
        confirmButtonMessage,
        showCancelButton
      },
    });
  }

  showWarning(
    title: string,
    messages: any[],
    cancelButtonMessage: string,
    confirmButtonMessage: string,
    showCancelButton: boolean
  ) {
    return this.dialog.open(DialogComponent, {
      data: {
        icon: 'warning',
        title,
        messages,
        cancelButtonMessage,
        confirmButtonMessage,
        showCancelButton
      }
    });
  }
}
