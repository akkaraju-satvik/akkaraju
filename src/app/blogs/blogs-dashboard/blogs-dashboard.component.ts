import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-dashboard',
  templateUrl: './blogs-dashboard.component.html',
  styleUrls: ['./blogs-dashboard.component.scss']
})
export class BlogsDashboardComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  navigateToCreate() {
    this.router.navigate(['/blogs/create']);
  }

}
