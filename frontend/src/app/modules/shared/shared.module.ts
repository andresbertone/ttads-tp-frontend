import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { NoRecordsMessageComponent } from './components/no-records-message/no-records-message.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { RoleDirective } from './directives/role.directive';


@NgModule({
  declarations: [
    NoRecordsMessageComponent,
    DialogComponent,
    RoleDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NoRecordsMessageComponent,
    DialogComponent,
    RoleDirective
  ]
})
export class SharedModule { }
