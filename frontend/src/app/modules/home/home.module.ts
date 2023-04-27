import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../../material.module';

import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ShortcutsComponent } from './components/shortcuts/shortcuts.component';


@NgModule({
  declarations: [
    HomeComponent,
    ShortcutsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class HomeModule { }
