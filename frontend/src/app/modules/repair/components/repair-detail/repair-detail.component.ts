import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RepairService } from 'src/app/core/services/repair.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';
import { StorageService } from 'src/app/core/services/common/storage.service';

import { RepairModel } from 'src/app/core/models/repair/repair.model';
import { RepairSettings } from 'src/app/core/utils/repairSettings';

@Component({
  selector: 'app-repair-detail',
  templateUrl: './repair-detail.component.html',
  styleUrls: ['./repair-detail.component.scss']
})
export class RepairDetailComponent {
  repairId!: string;
  repair!: RepairModel

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

  showTakeButton() {
    return this.repair.status === this.repairSettings.ENTERED_REPAIR && !this.repair.mechanicId;
  }

  showEditButton() {
    return this.repair.status === this.repairSettings.ENTERED_REPAIR ||
           this.repair.status === this.repairSettings.IN_PROGRESS_REPAIR;
  }

  goBack() {
    this.router.navigateByUrl('home/repairs');
  }
}
