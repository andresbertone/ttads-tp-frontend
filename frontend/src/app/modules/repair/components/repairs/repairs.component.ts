import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RepairService } from 'src/app/core/services/repair.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

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
    private alertService: AlertService
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

  showDeleteButton(status: string) {
    return status === this.repairSettings.DELIVERED_REPAIR;
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
