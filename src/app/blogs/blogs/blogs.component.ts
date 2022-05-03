import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(public blogsService: BlogsService) { }

  ngOnInit(): void {
    this.blogsService.getAllBlogs()
  }

}
