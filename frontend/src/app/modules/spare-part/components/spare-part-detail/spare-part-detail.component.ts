import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { SparePartService } from 'src/app/core/services/spare-part.service';

import { SparePartModel } from 'src/app/core/models/spare-part/spare-part.model';

@Component({
  selector: 'app-spare-part-detail',
  templateUrl: './spare-part-detail.component.html',
  styleUrls: ['./spare-part-detail.component.scss']
})
export class SparePartDetailComponent implements OnInit {

  sparePartId!: string;
  sparePart!: SparePartModel

  constructor(
    private sparePartService: SparePartService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sparePartId = this.activatedRoute.snapshot.paramMap.get('sparePartId') as string;
    if (!this.sparePartId) return;

    this.loadSparePart();
  }

  loadSparePart() {
    this.sparePartService.getSparePartById(this.sparePartId)
      .subscribe((sparePart: SparePartModel) => {
        this.sparePart = sparePart;
      });
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  editSparePart() {
    this.router.navigateByUrl(`home/spare-parts/edit-spare-part/${this.sparePartId}`);
  }

  goBack() {
    this.router.navigateByUrl('home/spare-parts');
  }
}
