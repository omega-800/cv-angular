import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';
import { ImageComponent } from 'src/app/components/components.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private storage:AngularFireStorage) { 
    
  }

  getImageURLs(path:string): string[] {
    let paths:string[] = [];

    if(path.endsWith("/")){
      this.storage.ref('/'+path).listAll().subscribe({
        next: (list:ListResult) => {
          list.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url: string) => {
              //console.log(url);
              paths.push(url)
            });
          });
        }, 
        error: (e) => console.log(e),
        complete: () => {
          //console.log(paths);
        }
      })
    }

    return paths;
  }
}
