import { Component, ViewChild, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

import { ShiftService } from 'src/app/core/services/shift.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';
import { DialogService } from 'src/app/core/services/common/dialog.service';
import { AlertService } from 'src/app/core/services/common/alert.service';

import { ShiftModel } from 'src/app/core/models/shift/shift.model';
import { ShiftsModel } from 'src/app/core/models/shift/shifts.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  shifts: MatTableDataSource<ShiftModel>;
  showFilters: boolean = false;

  displayedColumns: string[] = ['ShiftDate', 'Status', 'shiftCancellationDate', 'Customer', 'Action'];
  paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(
    private shiftService: ShiftService, 
    private spinnerService: SpinnerService,
    private dialogService: DialogService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.shifts = new MatTableDataSource();
  }
  
  ngOnInit(): void {
    this.loadShifts();
  }

  loadShifts() {
    const defaultDateString = this.getFormattedDate(new Date());
    this.shiftService.searchShifts({ date: defaultDateString }).subscribe((response: ShiftsModel) => {
      this.shifts.data = response.records;
    })
  }

  newShift() {
    this.router.navigateByUrl('home/shifts/new-shift');
  }

  cancelShift(shift: ShiftModel) {
    shift.shiftDate = this.getFormattedDate(shift.shiftDate);
    
    this.dialogService.showWarning(
      'Cancel shift',
      [this.dialogService.getDialogWarningMessage(shift, 'shift', 'cancel')],
      'No',
      'Confirm',
      true
    ).afterClosed().subscribe((result) => {
      if (result) {
        this.shiftService.cancelShift(shift.shiftId).subscribe(
          (shift: ShiftModel) => {
            const shiftDate = this.getFormattedDate(shift.shiftDate);
            this.alertService.openSnackBar(`The shift for ${shiftDate} was successfully cancelled.`);
            this.loadShifts();
          }
        );
      }
    });
  }

  searchShifts(eventParams: any) {
    const {date, customer} = eventParams;
    let dateString = '';
    
    if (date) dateString = this.getFormattedDate(date);

    this.shiftService.searchShifts({ date: dateString, customer }).subscribe(
      (response: ShiftsModel) => {
        this.shifts.data = response.records;
      }
    )
  }

  toggleFiltersVisibility() {
    this.showFilters = !this.showFilters;
  }

  shouldShowFilters() {
    return this.showFilters && !this.isLoading();
  }

  showCancelButton(status: string) {
    if (status === 'Stand by') return true;
    return false;
  }

  getColor(status: string) {
    switch (status) {
      case 'Stand by':
        return 'white'
      case 'Entered':
        return 'green'
      case 'Cancelled':
        return 'red'
      default:
        return 'white'
    }
  }

  showCancellationShiftDateColumn(shift: ShiftModel) {
    return shift.status === 'Cancelled' || shift.shiftCancellationDate;
  }

  initializePaginator(matPaginator: MatPaginator) {
    this.paginator = matPaginator;
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Shifts per page:';
      this.shifts.paginator = this.paginator;
    }
  }

  isLoading() {
    return this.spinnerService.isLoading();
  }

  getFormattedDate(date: string | Date) {
    return formatDate(date, 'MM-dd-yyyy', 'en-US');
  }
}
