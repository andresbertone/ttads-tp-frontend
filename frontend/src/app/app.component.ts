import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { SpinnerService } from './core/services/common/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
