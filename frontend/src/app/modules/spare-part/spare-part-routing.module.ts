import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SparePartsComponent } from './components/spare-parts/spare-parts.component';
import { NewSparePartComponent } from './components/new-spare-part/new-spare-part.component';

const routes: Routes = [
  {
    path: '',
    component: SparePartsComponent
  },
  {
    path: 'new-spare-part',
    component: NewSparePartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule { }
