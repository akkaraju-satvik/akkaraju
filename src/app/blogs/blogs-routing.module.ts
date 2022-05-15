import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsDashboardComponent } from './blogs-dashboard/blogs-dashboard.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { BlogsGuard } from './services/blogs.guard';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: BlogsDashboardComponent, data: {path: 'dashboard'}, canActivate: [BlogsGuard] },
  { path: 'create', component: CreateBlogComponent, data: {path: 'create'}, canActivate: [BlogsGuard] },
  { path: 'view-blogs', component: BlogsComponent, data: {path: 'blogs'}, canActivate: [BlogsGuard] },
  { path: 'view-blog', children: [
    { path: ':id', component: ViewBlogComponent, data: {path: 'view-blog'}, canActivate: [BlogsGuard] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }
