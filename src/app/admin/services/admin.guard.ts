import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.authData.isLoggedIn) {
      this.router.navigate(['/'])
      return false;
    } else {
      if(this.authService.authData.user.role === 'user') {
        this.router.navigate(['/'])
        return false;
      }
      if(route.data['path'] === 'dashboard') {
        return this.authService.authData.user.role === 'admin' ? true : this.router.navigate(['/'])
      } else if(route.data['path'] === 'files') {
        return this.authService.authData.user.role === 'admin' ? true : this.router.navigate(['/'])
      }
      console.log(route.data)
      return false;
    }
  }  
}
