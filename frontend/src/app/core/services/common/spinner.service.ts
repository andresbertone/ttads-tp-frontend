import { Injectable } from '@angular/core';
import { BehaviorSubject, count, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  private spinner$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private countLoading: number = 0;

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
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
