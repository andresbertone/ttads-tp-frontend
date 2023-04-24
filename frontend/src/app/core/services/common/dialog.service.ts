import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../../modules/shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  getDialogWarningMessage(model: any = {}, entityName: string = '', action: string = 'cancel') {
    if (action === 'cancel' && (!model || !entityName)) {
      return `Are you sure you want to cancel the operation?`
    }

    switch (entityName) {
      case 'spare part':
        return `Are you sure you want to ${action} the ${entityName}: ${model.sparePartDescription}?`;

      case 'vehicle':
        return `Are you sure you want to ${action} the ${entityName} ${model.make} ${model.model}?`;

      case 'repair': 
        return `Are you sure you want to ${action} this ${entityName}?`;

      case 'shift': {
        if (action === 'cancel') {
          return `Are you sure you want to ${action} ${model.customer.firstName} ${model.customer.lastName}'s shift for ${model.shiftDate}?`;
        }
        return `Are you sure you want to ${action} the ${entityName} for ${model.shiftDate}?`;
      }

      default:
        return `Are you sure you want to ${action} the ${entityName} ${model.firstName} ${model.lastName}?`;
    }
  }

  showError(
    title: string,
    messages: any[],
    cancelButtonMessage: string,
    confirmButtonMessage: string,
    showCancelButton: boolean,
    icon?: string
  ) {
    return this.dialog.open(DialogComponent, {
      data: {
        icon: icon || 'error',
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
    showCancelButton: boolean,
    icon?: string
  ) {
    return this.dialog.open(DialogComponent, {
      data: {
        icon: icon || 'warning',
        title,
        messages,
        cancelButtonMessage,
        confirmButtonMessage,
        showCancelButton
      }
    });
  }
}
