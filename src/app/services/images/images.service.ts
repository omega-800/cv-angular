import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private storage:AngularFireStorage) { 
    
  }

  getImageURLs(path:string): string[] {
    
    if(path.endsWith("/")){
      this.storage.ref('/'+this.image.path).listAll().subscribe({
        next: (list:ListResult) => {
          list.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url: string) => {
              //console.log(url);
              this.images.push({
                id:"image_"+itemRef.name,
                name:"Image of "+this.image.name,
                alt:"Image of "+this.image.alt,
                path:url
              })
            });
          });
        }, 
        error: (e) => console.log(e),
        complete: () => {
          console.log(this.images)
          if(this.images !== undefined && this.images.length > 0){
            console.log("this.images")
            this.isCarousel = true;
            this.hasImage = true;
          }
        }
      })
    }

    return [];
  }
}
