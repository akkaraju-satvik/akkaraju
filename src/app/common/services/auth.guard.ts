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
    if(!this.authService.authData.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    } else {
      if(route.data['path'] === 'manage') {
        return this.authService.authData.user.role === 'admin'
      }
      console.log(route.data)
      return false;
    }
    // return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree | any {
    if(childRoute.data['path'] === 'manage') {
      return this.authService.authData.isLoggedIn;
    }
  }
}
