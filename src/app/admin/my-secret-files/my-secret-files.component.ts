import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services/auth.service';
import { FirebaseStorageService } from 'src/app/admin/services/firebase-storage.service';
import { MatDialog } from '@angular/material/dialog'
import { MatMenuTrigger } from '@angular/material/menu'
import { ConfirmationPopupComponent, UploadPopupComponent } from 'src/app/common/popup/popup.component';

@Component({
  selector: 'app-my-secret-files',
  templateUrl: './my-secret-files.component.html',
  styleUrls: ['./my-secret-files.component.scss']
})
export class MySecretFilesComponent implements OnInit {

  constructor(public authService: AuthService, public firebaseStorageService: FirebaseStorageService, public activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  @ViewChild(MatMenuTrigger) context!: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.context.menuData = { item: item };
    this.context.menu.focusFirstItem('mouse');
    this.context.openMenu();
  }

  ngOnInit(): void {
    this.activatedRoute.data.forEach((vad: any) => {
      console.log(vad)
    })
    this.firebaseStorageService.getAllItems();
  }

  x(x: any) {
    console.log(x)
  }

  humanFileSize(size: number) {
    var i = Math.floor( Math.log(size) / Math.log(1024) );
    return (size / Math.pow(1024, i) ).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
  };

  openUploadPopup() {
    const dialogRef = this.dialog.open(UploadPopupComponent, {data: {action: 'upload'}})
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res, 'after closed res');
      this.firebaseStorageService.fileName = ''
      if(res === 'cancel' || !res) return;
      this.firebaseStorageService.uploadFile(res)
    })
  }
  
  deleteFile(file: any) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {data: {file, for: 'confirm', action: 'delete-file'}})
    dialogRef.afterClosed().subscribe((res: any) => {
      if(res === 'cancel' || !res) return;
      this.firebaseStorageService.deleteItem(file)
    })
  }
}
