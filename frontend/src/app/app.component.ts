import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { SpinnerService } from './core/services/common/spinner.service';
import { StorageService } from './core/services/common/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showSpinner = false;

  constructor(
    private spinnerService: SpinnerService, 
    private cdRef: ChangeDetectorRef,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    // TODO: Descomentar cuando termine todo
    // this.storageService.clear();
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}
