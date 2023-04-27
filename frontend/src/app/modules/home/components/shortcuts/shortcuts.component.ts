import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class ShortcutsComponent {

  shortcuts: any = {
    customers: {
      image: './assets/imgs/customers-shortcut.png',
      title: 'Customers'
    },
    repairs: {
      image: './assets/imgs/repairs-shortcut.png',
      title: 'Repairs'
    },
    shifts: {
      image: './assets/imgs/shifts-shortcut.png',
      title: 'Shifts'
    }
  }

  constructor(private router: Router) { }

  goToCustomersPage() {
    this.router.navigateByUrl('home/customers');
  }

  goToRepairsPage() {
    this.router.navigateByUrl('home/repairs');
  }

  goToShiftsPage() {
    this.router.navigateByUrl('home/shifts');
  }

}
