import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { NoRecordsMessageComponent } from './components/no-records-message/no-records-message.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ActionButtonsComponent } from './components/action-buttons/action-buttons.component';
import { RoleDirective } from './directives/role.directive';


@NgModule({
  declarations: [
    NoRecordsMessageComponent,
    DialogComponent,
    ActionButtonsComponent,
    RoleDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NoRecordsMessageComponent,
    DialogComponent,
    ActionButtonsComponent,
    RoleDirective
  ]
})
export class SharedModule { }
