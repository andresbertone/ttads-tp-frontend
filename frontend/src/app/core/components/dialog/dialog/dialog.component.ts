import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogService } from './../../../services/common/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {


  constructor(
    private dialogService: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeDialog() {
    this.dialogService.closeDialog();
  }
}
