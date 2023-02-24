import { Component, ViewChild, OnInit } from '@angular/core';

import { ShiftService } from 'src/app/core/services/shift.service';
import { SpinnerService } from 'src/app/core/services/common/spinner.service';

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

  searchShifts(eventParams: any) {
    const {date, customer} = eventParams;
    const dateString = this.getFormattedDate(date);

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
    const dateAndTime = value.toISOString();
    const onlyDate = dateAndTime.split('T')[0];
    return onlyDate;
  }
}
