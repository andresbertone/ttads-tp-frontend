import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RepairService } from 'src/app/core/services/repair.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';
import { StorageService } from 'src/app/core/services/common/storage.service';

import { RepairsModel } from 'src/app/core/models/repair/repairs.model';
import { RepairModel } from 'src/app/core/models/repair/repair.model';
import { RepairSettings } from 'src/app/core/utils/repairSettings';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.scss']
})
export class RepairsComponent implements OnInit {
  repairs!: MatTableDataSource<RepairModel>;
  showFilters: boolean = false;

  displayedColumns: string[] = ['EntryDateTime', 'StartDateTime', 'EndDateTime', 'DeliveryDateTime', 'Status', 'Vehicle', 'Mechanic', 'Action'];
  paginator!: MatPaginator;
  
  repairSettings = RepairSettings;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(
    private repairService: RepairService, 
    private spinnerService: SpinnerService,
    private router: Router,
    private dialogService: DialogService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    this.repairs = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadRepairs();
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  loadRepairs() {
    this.repairService.getRepairs().subscribe((response: RepairsModel) => {
      this.repairs.data = response.records;
    });
  }

  showMechanicColumn(repair: RepairModel) {
    return repair.mechanic;
  }

  showEditButton(repair: RepairModel) {
    return repair.status === this.repairSettings.ENTERED_REPAIR ||
           repair.status === this.repairSettings.IN_PROGRESS_REPAIR;
  }

  showDeleteButton(status: string) {
    return status === this.repairSettings.DELIVERED_REPAIR;
  }

  showTakeButton(repair: RepairModel) {
    return repair.status === this.repairSettings.ENTERED_REPAIR && !repair.mechanicId;
  }

  initializePaginator(matPaginator: MatPaginator) {
    this.paginator = matPaginator;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Repairs per page:';
      this.repairs.paginator = this.paginator;
    }
  }

  searchRepair(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setCustomFilterPredicate();
    this.repairs.filter = filterValue.trim().toLowerCase();

    if (this.repairs.paginator) {
      this.repairs.paginator.firstPage();
    }
  }

  newRepair() {
    this.router.navigateByUrl('home/repairs/new-repair');
  }

  editRepair(repair: RepairModel) {
    this.router.navigateByUrl(`home/repairs/edit-repair/${repair.repairId}`);
  }

  seeRepairDetail(repair: RepairModel) {
    this.router.navigateByUrl(`home/repairs/detail/${repair.repairId}`);
  }

  deleteRepair(repair: RepairModel) {
    this.dialogService.showWarning(
      'Delete repair',
      [this.dialogService.getDialogWarningMessage(repair, 'repair', 'delete')],
      'No',
      'Delete',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        this.repairService.deleteRepair(repair.repairId).subscribe(
          () => {
            this.alertService.openSnackBar(`The repair was successfully deleted.`);
            this.loadRepairs();
          }
        );
      }
    });
  }

  takeRepair(repair: RepairModel) {
    this.dialogService.showWarning(
      'Take repair',
      [this.dialogService.getDialogWarningMessage(repair, 'repair', 'take')],
      'No',
      'Yes',
      true
    ).afterClosed().subscribe((result) => {
      if (!result) return;

      const user = this.storageService.getUser();
      if (!user || !user.mechanicId) return this.router.navigateByUrl('login');

      return this.repairService.takeRepair(repair.repairId, user.mechanicId).subscribe(
        () => {
          this.alertService.openSnackBar(`The repair has been assigned to you.`);
          this.loadRepairs();
        }
      );
    });
  }

  searchRepairs(eventParams: any) {
    const { status, mechanicId } = eventParams;

    this.repairService.getRepairs({ status, mechanicId }).subscribe(
      (response: RepairsModel) => {
        this.repairs.data = response.records;
      }
    )
  }

  toggleFiltersVisibility() {
    this.showFilters = !this.showFilters;
  }

  shouldShowFilters() {
    return this.showFilters && !this.isLoading();
  }

  setCustomFilterPredicate() {
    this.repairs.filterPredicate = (data, filter) => {
      let dataString = data.startDateTime + data.entryDateTime + data.endDateTime + data.deliveryDateTime + data.status + data.vehicle.make + data.vehicle.model;

      if (data.mechanic) {
        dataString = dataString + data.mechanic.firstName + data.mechanic.lastName;
      }

      return dataString.toLowerCase().indexOf(filter) !== -1;
    }
  }
}
