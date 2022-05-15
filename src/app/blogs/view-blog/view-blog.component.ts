import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationPopupComponent, SharePopupComponent } from 'src/app/common/popup/popup.component';
import { AuthService } from 'src/app/common/services/auth.service';
import { BlogsService } from '../services/blogs.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  constructor(public blogsService: BlogsService, public authService: AuthService, public dialog: MatDialog, public route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    console.log(this.blogsService.currentBlog, this.authService.authData)
    if(!this.blogsService.currentBlog) {
      this.blogsService.getBlogLoad = true;
      this.blogsService.getBlog(this.route.snapshot.params['id'])
    }
  }

  openPopup(type: any) {
    if(type === 'delete') {
      const dialogRef = this.dialog.open(ConfirmationPopupComponent, {data: {
        blog: this.blogsService.currentBlog,
        for: 'confirm',
        action: 'delete-blog'
      }})
      dialogRef.afterClosed().subscribe((res: any) => {
        if(res === 'cancel') return;
        this.blogsService.deleteBlog(this.blogsService.currentBlog);
      })
    } else if(type === 'share') {
      const dialogRef = this.dialog.open(SharePopupComponent, {data: {
        // url: this.router.url,
        url: window.location.href,
        for: 'share',
        action: 'share-blog'
      }})
    }
  }

}
