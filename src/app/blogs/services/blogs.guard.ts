import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/common/services/auth.service';
import { BlogsService } from './blogs.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public blogsService: BlogsService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.authData.isLoggedIn) {
      if(route.data['path'] === 'view-blog' || route.data['path'] === 'blogs') {
        return true;
      } else return false;
    } else {
      if(route.data['path'] === 'create') {
        return this.authService.authData.user.role === 'admin';
      } else if (route.data['path'] === 'dashboard') {
        if(this.authService.authData.user.role !== 'admin') {
          this.router.navigate(['/'])
          return false;
        }
        return true;
      } else if (route.data['path'] === 'blogs') {
        return true;
      } else if (route.data['path'] === 'view-blog') {
        if(this.blogsService.currentBlog) return true;
        else {
          this.blogsService.getBlog(route.params['id'])
          // this.router.navigate(['/blogs/view-blogs'])
          return true
        };
      } else {
        this.router.navigate(['/blogs'])
        return false;
      }
    }
  }
  
}
