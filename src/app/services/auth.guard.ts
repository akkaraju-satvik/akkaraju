import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this.authService.authData.isLoggedIn) {
      console.log('not logged in');
      if(route.data['path'] === 'login'){
        return true;
      } else {
        return false;
      }
    } else {
      if(route.data['path'] === 'login'){
        if(this.authService.authData.user.role === 'user') {
          this.router.navigate(['/whoami']);
          return false;
        } else {
          this.router.navigate(['/whoami']);
          return false;
        }
      } else if(route.data['path'] === 'whoami'){
        return true;
      }
    }
    return false;
  }
}
