import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SparePartsComponent } from './components/spare-parts/spare-parts.component';
import { NewSparePartComponent } from './components/new-spare-part/new-spare-part.component';
import { SparePartDetailComponent } from './components/spare-part-detail/spare-part-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SparePartsComponent
  },
  {
    path: 'new-spare-part',
    component: NewSparePartComponent
  },
  {
    path: 'edit-spare-part/:sparePartId',
    component: NewSparePartComponent
  },
  {
    path: 'detail/:sparePartId',
    component: SparePartDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule { }
