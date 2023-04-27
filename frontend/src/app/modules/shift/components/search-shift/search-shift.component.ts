import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-shift',
  templateUrl: './search-shift.component.html',
  styleUrls: ['./search-shift.component.scss']
})
export class SearchShiftComponent {

  @Output() searchShiftsEvent = new EventEmitter(); 

  date: Date = new Date();
  customer = '';


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
