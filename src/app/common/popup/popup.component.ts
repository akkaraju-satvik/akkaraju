import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseStorageService } from '../services/firebase-storage.service';

@Component({
  selector: 'app-upload-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class UploadPopupComponent implements OnInit {

  constructor(public firebaseStorageService: FirebaseStorageService, public dialog: MatDialog, public dialogRefSelf: MatDialogRef<UploadPopupComponent>) { }


  ngOnInit(): void {
    document.querySelector('button[file]')?.addEventListener('click', (e: any) => {
      document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
    })
  }

  openConfirmationPopup(event: any) {
    this.firebaseStorageService.fileName = event.target.files[0].name;
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        fileName: event.target.files[0].name
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'upload') {
        console.log(event.target.files[0])
        this.dialogRefSelf.close(event.target.files[0])
      } else if(result === 'cancel') {
        this.dialogRefSelf.close('cancel')
      } else {
        this.dialogRefSelf.close('cancel')
      }
    })
  }
}

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
})
export class ConfirmationPopupComponent implements OnInit { 
  constructor(public firebaseStorageService: FirebaseStorageService, public dialogRef: MatDialogRef<ConfirmationPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    console.log(this.data)
  }

  close(action: any) {
    console.log(action)
    this.dialogRef.close(action)
  }
  
}