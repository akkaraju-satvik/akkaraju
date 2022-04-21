import { Injectable } from '@angular/core';
import { getStorage, ref, listAll, StorageReference, getDownloadURL, deleteObject, getMetadata } from '@angular/fire/storage';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  storageItems: any = []
  storageItemsLoad: boolean = false
  storagePrefixes: any = []
  storagePrefixesLoad: boolean = false

  constructor() { }

  getAllItems() {
    const storage = getStorage();
    const storageRef = ref(storage);
    const items = listAll(storageRef)
    this.storageItemsLoad = true;
    from(items).subscribe((res: any) => {
      console.log(res)
      res.items.map(async (item: any, index: any) => {
        item.url = await getDownloadURL(item)
        item.metadata = await getMetadata(item)
        item.metadata.timeCreated = new Date(item.metadata.timeCreated).toLocaleString('en-GB')
        this.storageItems.push(item)
        if(index === res.items.length - 1) {
          this.storageItemsLoad = false;
        }
        // console.log(this.storageItems);
      })
    })
    this.storagePrefixesLoad = true
    from(items).subscribe((res: any) => {
      this.storagePrefixes = res.prefixes
      this.storagePrefixesLoad = false
    })
  }

  getPrefixFiles(prefix: any) {
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
    const items = listAll(storageRef)
    this.storageItemsLoad = true
    from(items).subscribe((res: any) => {
      console.log(res, 'pref files');
      (res.items.length > 0) && res.items.map(async (item: any, index: any) => {
        item.url = await getDownloadURL(item)
        item.metadata = await getMetadata(item)
        item.metadata.timeCreated = new Date(item.metadata.timeCreated).toLocaleString('en-GB')
        this.storageItems.push(item)
        if(index === res.items.length - 1) {
          this.storageItemsLoad = false;
        }
        // console.log(this.storageItems);
      });
      res.items.length === 0 && (this.storageItemsLoad = false)
    })
    this.storagePrefixesLoad = true
    from(items).subscribe((res: any) => {
      this.storagePrefixes.push(...res.prefixes)
      console.log(this.storagePrefixes)
      this.storagePrefixesLoad = false;
    })
    console.log(this.storagePrefixes, 'prefixes')
    console.log(this.storageItems, 'items')
    console.log(this.storageItemsLoad, this.storagePrefixesLoad, 'load')
  }

  deleteItem(item: any) {
    const storage = getStorage();
    const storageRef = ref(storage, item);
    const items = listAll(storageRef)
    from(items).subscribe((res: any) => {
      from(deleteObject(storageRef)).subscribe((res: any) => {
        console.log(res);
      })
    })
  }
}
