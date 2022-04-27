import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsDashboardComponent } from './blogs-dashboard/blogs-dashboard.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    BlogsDashboardComponent,
    CreateBlogComponent,
    ViewBlogComponent
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    QuillModule.forRoot()
  ]
})
export class BlogsModule { }
