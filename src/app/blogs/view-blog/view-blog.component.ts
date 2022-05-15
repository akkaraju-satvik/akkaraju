import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent } from 'src/app/common/popup/popup.component';
import { AuthService } from 'src/app/common/services/auth.service';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  constructor(public blogsService: BlogsService, public authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.blogsService.currentBlog)
  }

  openPopup(blog: any) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {data: {
      blog,
      for: 'confirm',
      action: 'delete-blog'
    }})
    dialogRef.afterClosed().subscribe((res: any) => {
      if(res === 'cancel') return;
      this.blogsService.deleteBlog(blog);
    })
  }

}
