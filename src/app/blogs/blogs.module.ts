import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsDashboardComponent } from './blogs-dashboard/blogs-dashboard.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { QuillModule } from 'ngx-quill';
import { BlogsComponent } from './blogs/blogs.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BlogsDashboardComponent,
    CreateBlogComponent,
    ViewBlogComponent,
    BlogsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BlogsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ]
})
export class BlogsModule { }
