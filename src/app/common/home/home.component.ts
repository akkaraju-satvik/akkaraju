import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirebaseStorageService } from 'src/app/common/services/firebase-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  routerPath: any
  constructor(public authService: AuthService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.authService.authData)
    this.activatedRoute.data.forEach((data: any) => {
      this.routerPath = data.path
    })
    if(localStorage.getItem('authData') !== null) {
      this.authService.authData = JSON.parse(localStorage.getItem('authData') || JSON.stringify({authData: ''}));
    }
  }

  logout() {
    this.authService.logout();
  }

}
