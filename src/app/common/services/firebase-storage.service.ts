import { Injectable, NgZone } from '@angular/core';
import { getStorage, ref, listAll, getDownloadURL, deleteObject, getMetadata, uploadBytesResumable } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  storageItems: any = []
  storageItemsLoad: boolean = false
  
  storagePrefixes: any = []
  storagePrefixesLoad: boolean = false

  currentPrefix: any
  uploadProgress: any
  fileName: any = ''
  uploadLoad: boolean = false;

  constructor(private zone: NgZone) { }

  download(file: any) {
    getDownloadURL(file).then((url: any) => {
      console.log(url, 'url')
      window.open(url, '_blank')
    })
  }

  getAllItems() {
    this.storageItems = []
    this.storagePrefixes = []
    const storage = getStorage();
    const storageRef = ref(storage);
    this.currentPrefix = storageRef
    const items = listAll(storageRef)
    this.storageItemsLoad = true;
    from(items).subscribe((res: any) => {
      console.log(res)
      res.items.length > 0 && res.items.map(async (item: any, index: any) => {
        // item.url = await getDownloadURL(item)
        // item.metadata = await getMetadata(item)
        // let time = item.metadata.timeCreated
        // item.metadata.timeCreated = new Date(item.metadata.timeCreated).toLocaleString('en-GB')
        this.storageItems.push(item)
        if(index === res.items.length - 1) {
          // this.storageItems.sort((a: any, b: any) => a.metadata.timeCreated > b.metadata.timeCreated ? 1 : -1)
          this.storageItemsLoad = false;
        }
        // console.log(this.storageItems);
      })
      res.items.length === 0 && (this.storageItemsLoad = false)
    })
    this.storagePrefixesLoad = true
    from(items).subscribe((res: any) => {
      this.storagePrefixes = res.prefixes
      this.storagePrefixesLoad = false
    })
  }

  uploadFile(file: any) {
    console.log(file)
    const storage = getStorage();
    const storageRef = ref(storage, this.currentPrefix._location.path+'/'+file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    console.log(storageRef, 'storageRef')
    this.uploadLoad = true
    this.storageItemsLoad = true
    this.storagePrefixesLoad = true
    this.storageItems = []
    this.storagePrefixes = []
    uploadTask.on('state_changed', (snapshot: any) => {
      // Observe state change files such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused': // or 'paused'
          console.log('Upload is paused');
          break;
        case 'running': // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error: any) => {
      // Handle unsuccessful uploads
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, () => {
      this.uploadLoad = false
      this.getPrefixFiles(this.currentPrefix)
    })
  }

  getPrefixFiles(prefix: any) {
    this.currentPrefix = prefix
    console.log(prefix, 'prefix')
    this.storagePrefixes = []
    this.storageItems = []
    console.log(prefix.isRoot, 'isroot')
    if(prefix._location.path) {
      prefix.parent.isParent = true
      let x = prefix.parent
      x.isParent = true
      console.log(x, 'parent')
      this.storagePrefixes.push(x)
    }
    const storage = getStorage();
    const storageRef = ref(storage, prefix);
    this.storageItemsLoad = true
    this.storagePrefixesLoad = true
    this.zone.run(
      () => {
        listAll(storageRef).then((res: any) => {
          console.log(res, 'res')
          res.items.length > 0 && res.items.map(async (item: any, index: any) => {
            this.storageItems.push(item)
            if(index === res.items.length - 1) {
              this.storageItemsLoad = false;
            }
          })
          res.items.length === 0 && (this.storageItemsLoad = false)
          res.prefixes.length > 0 && res.prefixes.map(async (item: any, index: any) => {
            this.storagePrefixes.push(item)
            if(index === res.prefixes.length - 1) {
              this.storagePrefixesLoad = false;
            }
          })
          res.prefixes.length === 0 && (this.storagePrefixesLoad = false)
        })
      }
    )
    // from(items).subscribe((res: any) => {
    //   this.storagePrefixes.push(...res.prefixes)
    //   console.log(this.storagePrefixes)
    //   this.storagePrefixesLoad = false;
    //   console.log(this.storagePrefixesLoad, 'storagePrefixesLoad')
    // })
    console.log(this.storagePrefixes, 'prefixes')
    console.log(this.storageItems, 'items')
    console.log(this.storageItemsLoad, this.storagePrefixesLoad, 'load')
  }

  deleteItem(item: any) {
    console.log(item)
    const storage = getStorage();
    const storageRef = ref(storage, item);
    const items = listAll(storageRef)
    from(items).subscribe((res: any) => {
      from(deleteObject(storageRef)).subscribe((res: any) => {
        this.getPrefixFiles(item.parent)
      })
    })
  }
}
