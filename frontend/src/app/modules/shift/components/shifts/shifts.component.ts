import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ShiftService } from 'src/app/core/services/shift.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';

import { ShiftModel } from 'src/app/core/models/shift/shift.model';
import { ShiftsModel } from 'src/app/core/models/shift/shifts.model';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {

  shifts: MatTableDataSource<ShiftModel>;

  defaultDate: FormControl = new FormControl(new Date());  
  defaultDateString: string;

  displayedColumns: string[] = ['ShiftDate', 'Status', 'Customer', 'Action'];
  paginator!: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(matPaginator: MatPaginator) {
    this.initializePaginator(matPaginator);
  }

  constructor(
    private shiftService: ShiftService, 
    private spinnerService: SpinnerService
  ) {
    this.shifts = new MatTableDataSource();
    this.defaultDateString = this.getFormattedDate(this.defaultDate.value);
  }

  ngOnInit(): void {
    this.loadShifts();
  }

  loadShifts() {
    this.shiftService.getShiftsByDate().subscribe((response: ShiftsModel) => {
      this.shifts.data = response.records;
    });
  }

  searchShiftsByDate(event: MatDatepickerInputEvent<Date>) {
    if (!this.defaultDate.value) {
      this.defaultDate.setValue(new Date());
    }
    const onlyDateString = this.getFormattedDate(event.value as Date);
    this.shiftService.getShiftsByDate({ date: onlyDateString }).subscribe((response: ShiftsModel) => {
      this.shifts.data = response.records;
    });
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

  getFormattedDate(value: Date) {
    if (!value) {
      return this.defaultDateString;
    }
    const dateAndTime = value.toISOString();
    const onlyDate = dateAndTime.split('T')[0];
    return onlyDate;
  }
}
