import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.authData.isLoggedIn) {
      return false;
    } else {
      if(route.data['path'] === 'create') {
        return this.authService.authData.user.role === 'admin';
      } else if (route.data['path'] === 'dashboard') {
        if(this.authService.authData.user.role !== 'admin') {
          this.router.navigate(['/'])
          return false;
        }
        return true;
      } else {
        this.router.navigate(['/blogs'])
        return false;
      }
    }
  }
  
}
