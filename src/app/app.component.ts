import { Component } from '@angular/core';
import { AuthService } from './common/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'private-notes';

  constructor(public authService: AuthService) {
    if(localStorage.getItem('authData') !== null) {
      this.authService.authData = JSON.parse(localStorage.getItem('authData') || JSON.stringify({isLoggedIn: false}));
    } else {
      this.authService.authData = {}
    }
  }
}
