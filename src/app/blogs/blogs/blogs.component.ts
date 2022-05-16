import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(public blogsService: BlogsService, public router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.blogsService.getAllBlogs()
  }

  goToBlog(blog: any) {
    this.blogsService.currentBlog = blog
    this.router.navigate(['blogs/view-blog', blog.id])
  }

}
