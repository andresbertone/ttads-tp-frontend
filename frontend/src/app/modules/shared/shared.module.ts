import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { NoRecordsMessageComponent } from './components/no-records-message/no-records-message.component';
import { RoleDirective } from './directives/role.directive';


@NgModule({
  declarations: [
    NoRecordsMessageComponent,
    RoleDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NoRecordsMessageComponent,
    RoleDirective
  ]
})
export class SharedModule { }
