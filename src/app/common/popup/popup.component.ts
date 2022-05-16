import { Component, Inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseStorageService } from '../services/firebase-storage.service';

@Component({
  selector: 'app-upload-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class UploadPopupComponent implements OnInit {

  constructor(public firebaseStorageService: FirebaseStorageService, public dialog: MatDialog, public dialogRefSelf: MatDialogRef<UploadPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    document.querySelector('button[file]')?.addEventListener('click', (e: any) => {
      document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
    })
  }

  openConfirmationPopup(event: any) {
    this.firebaseStorageService.fileName = event.target.files[0].name;
    console.log(event.target.files[0])
    let x = this.data
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: {
        ...x,
        fileName: event.target.files[0].name
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'success') {
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

@Component({
  selector: 'app-share-popup',
  templateUrl: './share-popup.component.html',
  styleUrls: ['share-popup.component.scss']
})
export class SharePopupComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<SharePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public clipboard: Clipboard) {  }

  copied: boolean = false;

  ngOnInit(): void {
    this.dialogRef.updateSize('50vw', '22vh')
    if(window.outerWidth < 768) {
      this.dialogRef.updateSize('70vw', '275px')
    }
    console.log(this.data)
  }

  copyToClipboard() {
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 3000);
    document.querySelector<HTMLInputElement>('input[matInput]')?.select();
    this.clipboard.copy(this.data.url)
  }

  shareToWhatsapp() {
    window.open(`https://wa.me/?text=${this.data.url}`, '_blank')
  }
}