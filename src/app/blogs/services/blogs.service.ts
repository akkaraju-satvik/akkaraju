import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { deleteDoc } from '@firebase/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  blogs: any = []
  blogFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    createdAt: new FormControl('', [Validators.required]),
  })
  currentBlog: any = null
  getBlogsLoad: boolean = false;

  constructor(public firestore: Firestore, public router: Router) { }

  postBlog() {
    // post a new blog
    this.blogFormGroup.value.createdAt = new Date().toLocaleString('en-UK', { timeZone: 'Asia/Kolkata' });
    from(addDoc(collection(this.firestore, 'Blogs'), this.blogFormGroup.value)).subscribe((blogRef) => {
      this.blogFormGroup.reset();
      this.router.navigate(['/blogs/view-blogs']);
    })
  }

  getAllBlogs() {
    // get all items from blogs collection
    this.getBlogsLoad = true
    from(getDocs(query(collection(this.firestore, 'Blogs'), orderBy('createdAt')))).subscribe((blogs) => {
      this.blogs = blogs.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      })
      this.getBlogsLoad = false
      console.log(this.blogs)
    })
  }

  deleteBlog(blog: any) {
    from(getDocs(query(collection(this.firestore, 'Blogs'), where('createdAt', '==', blog.createdAt)))).subscribe((res) => {
      res.forEach((blog) => {
        from(deleteDoc(blog.ref)).subscribe((res) => {
          console.log(res)
          this.router.navigate(['/blogs/view-blogs'])
        })
      })
    })
  }
}
