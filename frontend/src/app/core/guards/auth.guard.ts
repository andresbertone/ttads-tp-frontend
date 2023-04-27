import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/common/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.navigateByUrl('/login');
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      const allowedRoles = ['admin', 'mechanic'];
      const currentUser = this.storageService.getUser();

      if (currentUser && currentUser.role && currentUser.role.roleDescription) {
        if (allowedRoles.includes(currentUser.role.roleDescription)) {
          if (childRoute.data['role'].includes('all')) return true;
    
          if (childRoute.data['role'].includes(currentUser.role.roleDescription)) return true;
        }
      }
    }

    return this.router.navigateByUrl('/login');
  }
  
}
