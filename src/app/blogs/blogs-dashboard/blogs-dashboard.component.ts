import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs-dashboard',
  templateUrl: './blogs-dashboard.component.html',
  styleUrls: ['./blogs-dashboard.component.scss']
})
export class BlogsDashboardComponent implements OnInit {

  constructor(public router: Router, public blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogsService.getAllBlogs()
  }

  navigateToCreate() {
    this.router.navigate(['/blogs/create']);
  }

}
