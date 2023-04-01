import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './common/http.service';
import { StorageService } from './common/storage.service';

import { environment } from 'src/environments/environment';
import { AuthModel } from '../models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl: string = environment.baseUrl + '/auth';

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) { }

  login(userData: any): Observable<AuthModel> {
    return this.httpService.httpPost(`${this.baseUrl}/login`, userData);
  }

  isLoggedIn() {
    return this.storageService.get('sessionToken') && this.storageService.get('user');
  }
}
