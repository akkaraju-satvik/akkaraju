import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, query } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  })

  constructor(public firestore: Firestore) { }

  getAllBlogs() {
    // get all items from blogs collection
    from(getDocs(query(collection(this.firestore, 'Blogs')))).subscribe((blogs) => {
    })
  }
}
