import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { RepairService } from 'src/app/core/services/repair.service';

import { RepairModel } from 'src/app/core/models/repair/repair.model';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent {
  repairId!: string;
  repair!: RepairModel

  constructor(
    private repairService: RepairService,
    private spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.repairId = this.activatedRoute.snapshot.paramMap.get('repairId') as string;
    if (!this.repairId) return;

    this.loadRepair();
  }

  loadRepair() {
    this.repairService.getRepairById(this.repairId)
      .subscribe((repair: RepairModel) => {
        this.repair = repair;
      });
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  // TODO: Descomentar cuando haga el edit repair
  // editRepair() {
  //   this.router.navigateByUrl(`home/repairs/edit-repair/${this.repairId}`);
  // }

  goBack() {
    this.router.navigateByUrl('home/repairs');
  }
}
