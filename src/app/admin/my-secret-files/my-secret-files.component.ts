import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirebaseStorageService } from 'src/app/common/services/firebase-storage.service';

@Component({
  selector: 'app-my-secret-files',
  templateUrl: './my-secret-files.component.html',
  styleUrls: ['./my-secret-files.component.scss']
})
export class MySecretFilesComponent implements OnInit {

  constructor(public authService: AuthService, public firebaseStorageService: FirebaseStorageService, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.forEach((vad: any) => {
      console.log(vad)
    })
    this.firebaseStorageService.getAllItems();
  }

  humanFileSize(size: number) {
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return (size / Math.pow(1024, i) ).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };

}
