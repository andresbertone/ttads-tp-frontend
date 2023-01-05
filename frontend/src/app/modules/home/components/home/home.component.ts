import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  opened: boolean = true;

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['home']);
  }
}
