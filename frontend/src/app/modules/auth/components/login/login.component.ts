import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FormValidationService } from 'src/app/core/services/common/form-validation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/common/storage.service';

import { AuthModel } from 'src/app/core/models/auth/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userLoginImage = './assets/imgs/user-login.png';
  showPassword = false;
  errorHasOccurred = false;
  errorMessage = '';

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) { 
    this.storageService.clear();
  }


  login() {
    if (!this.loginForm.valid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response: AuthModel) => {
        this.storageService.save('sessionToken', response.sessionToken);
        this.storageService.save('user', JSON.stringify(response.user));
        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorHasOccurred = true;
          this.errorMessage = error.error;
        }
      }
    });
  }

  isFieldValid(field: string) {
    return this.formValidationService.isFieldValid(this.loginForm, field);
  }

  getFieldErrorMessage(field: string) {
    return this.formValidationService.getFieldErrorMessage(this.loginForm, field);
  }
}
