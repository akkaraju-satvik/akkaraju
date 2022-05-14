import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    from(getDocs(query(collection(this.firestore, 'Blogs'), orderBy('createdAt')))).subscribe((blogs) => {
      this.blogs = blogs.docs.map((doc) => doc.data())
      console.log(this.blogs)
    })
  }
}
