import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from 'src/app/core/services/common/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  opened: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  goToHome() {
    this.router.navigate(['home']);
  }

  logout() {
    this.storageService.clear();
    this.router.navigateByUrl('/login');
  }
}
