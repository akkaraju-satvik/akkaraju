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
      if(route.data['path'] === 'home') return true;
      this.router.navigate(['/home'])
      return false;

    } else {
      console.log(state, 'state')
      if(this.authService.authData.user.role === 'admin') {
        // this.router.navigate(['admin'])
        return true;
      }
      if(route.data['path'] === 'home') return true;
      return false;
    }
    // return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree | any {
    if(childRoute.data['path'] === 'files') {
      return this.authService.authData.user.role === 'admin' ? true : this.router.navigate(['/home']);
    }
  }
}
