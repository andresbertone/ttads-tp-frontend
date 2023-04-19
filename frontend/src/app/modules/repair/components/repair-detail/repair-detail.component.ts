import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RepairService } from 'src/app/core/services/repair.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';
import { StorageService } from 'src/app/core/services/common/storage.service';

import { RepairModel } from 'src/app/core/models/repair/repair.model';
import { SparePartModel } from 'src/app/core/models/spare-part/spare-part.model';
import { RepairSettings } from 'src/app/core/utils/repairSettings';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent {
  repairId!: string;
  repair!: RepairModel

  displayedColumns: string[] = ['Description', 'Quantity', 'UnitPrice', 'TotalPrice'];

  repairSettings = RepairSettings;

  constructor(
    private repairService: RepairService,
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private storageService: StorageService,
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

  editRepair() {
    this.router.navigateByUrl(`home/repairs/edit-repair/${this.repairId}`);
  }

  takeRepair() {
    this.dialogService.showWarning(
      'Take repair',
      [this.dialogService.getDialogWarningMessage(this.repair, 'repair', 'take')],
      'No',
      'Yes',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        const user = this.storageService.getUser();
        if (!user || !user.mechanicId) return;

        this.repairService.takeRepair(this.repair.repairId, user.mechanicId).subscribe(
          () => {
            this.alertService.openSnackBar(`The repair has been assigned to you.`);
            this.loadRepair();
          }
        );
      }
    });
  }

  markRepairAsCompleted() {
    this.dialogService.showWarning(
      'Mark repair as completed',
      ['Are you sure you want to mark this repair as completed?'],
      'No',
      'Yes',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        const user = this.storageService.getUser();
        if (!user || !user.mechanicId) return;

        this.repairService.markRepairAsCompleted(this.repair.repairId, user.mechanicId).subscribe(
          () => {
            this.alertService.openSnackBar(`The repair has been marked as completed.`);
            this.loadRepair();
          }
        );
      }
    });
  }

  getTotalPriceOfRepair() {
    const laborPrice = parseFloat(this.repair.laborPrice) || 0;
    return laborPrice + this.getTotalPriceOfUsedSpareParts();
  }

  getTotalPriceOfUsedSpareParts() {
    const initialValue = 0;
    return this.repair.spare_parts.reduce((total, currentSparePart) => {
      return total + this.getTotalPriceBySparePart(currentSparePart)
    }, initialValue);
  }

  getTotalPriceBySparePart(sparePart : SparePartModel) {
    return parseFloat(sparePart.sparePartPrice) * parseInt(sparePart.repair_spare.numberOfSpareParts);
  }

  getAccordionDescription() {
    if (this.repair.spare_parts.length === 0) {
      return 'There are no used spare parts.';
    } else if (this.repair.spare_parts.length === 1) {
      return `There is ${this.repair.spare_parts.length} spare part.`;
    } else {
      return `There are ${this.repair.spare_parts.length} spare parts.`;
    }
  }

  showTakeButton() {
    return this.repair.status === this.repairSettings.ENTERED_REPAIR && !this.repair.mechanicId;
  }

  showMarkAsCompletedButton() {
    return this.repair.status === this.repairSettings.IN_PROGRESS_REPAIR && 
           this.isTakenByTheSameMechanic();
  }

  isTakenByTheSameMechanic() {
    const user = this.storageService.getUser();
    if (!user || !user.mechanicId) return false;
    return this.repair.mechanicId === user.mechanicId;
  }

  showEditButton() {
    return this.repair.status === this.repairSettings.ENTERED_REPAIR ||
           this.repair.status === this.repairSettings.IN_PROGRESS_REPAIR;
  }

  goBack() {
    this.router.navigateByUrl('home/repairs');
  }
}
