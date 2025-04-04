import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  private spinner$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private countLoading = 0;

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  isLoading() {
    return this.countLoading > 0;
  }

  showSpinner() {
    this.countLoading++;
    this.spinner$.next('start');
  }

  hideSpinner() {
    this.countLoading--;
    if (this.countLoading <= 0) {
      this.spinner$.next('stop');
      this.countLoading = 0;
    }
  }
}
