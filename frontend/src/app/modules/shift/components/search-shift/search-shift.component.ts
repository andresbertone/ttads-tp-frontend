import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-shift',
  templateUrl: './search-shift.component.html',
  styleUrls: ['./search-shift.component.scss']
})
export class SearchShiftComponent {

  @Output() searchShiftsEvent = new EventEmitter<any>(); 

  date: Date = new Date();
  customer: string = '';


  searchShifts() {
    this.searchShiftsEvent.emit({ 
      date: this.date,
      customer: this.customer.trim()
    });
  }

  clearInput() {
    this.customer = '';
  }
}
