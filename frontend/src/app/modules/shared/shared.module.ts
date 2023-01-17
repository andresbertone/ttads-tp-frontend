import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { NoRecordsMessageComponent } from './components/no-records-message/no-records-message.component';


@NgModule({
  declarations: [
    NoRecordsMessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NoRecordsMessageComponent
  ]
})
export class SharedModule { }
