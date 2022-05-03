import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  constructor(public blogsService: BlogsService) { }

  ngOnInit(): void {
  }

}
