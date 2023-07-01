import { Component, Input, OnInit } from '@angular/core';
import { ImageComp } from '../../components.model';
import { arrowIcon } from '../../components.constants';
import * as assets from 'src/assets/fileStructure.json';

@Component({
  selector: 'app-contentbox',
  templateUrl: './contentbox.component.html',
  styleUrls: ['./contentbox.component.scss']
})
export class ContentboxComponent implements OnInit {
  @Input() title!: string;
  @Input() subTitle?: string;
  @Input() description!: string;
  @Input() link?: string;
  @Input() image!: ImageComp;
  @Input() imagePreview?: ImageComp;

  arrowIcon: ImageComp = arrowIcon;
  isCarousel: boolean = false;
  hasImage: boolean = false;
  images: ImageComp[] = [];
  preview: ImageComp = { id: "", name: "", alt: "", path: "" };
  main: ImageComp = { id: "", name: "", alt: "", path: "" };

  constructor(/*private storage:AngularFireStorage*/) {
  }

  ngOnInit() {
    const thumbnail: string = "thumbnail.webp";
    const assetsPath: string = "assets/content";
    this.preview = this.imagePreview === undefined ? this.image : this.imagePreview;
    if (this.image.path != "") {
      if (!this.image.path.endsWith("/")) {
        this.hasImage = true;
      } else {
        let files = assets["src/" + assetsPath + this.image.path.slice(0, -1) as keyof typeof assets];
        if (files && files.length > 0) {
          this.hasImage = true;
          this.images = files.filter(file => { return file !== thumbnail }).map(file => {
            return {
              id: file,
              name: this.title + " " + file,
              alt: "Image of " + this.title,
              path: assetsPath + this.image.path + file
            }
          })
          this.preview = this.imagePreview === undefined ? {
            id: "image_" + this.title,
            name: this.title,
            alt: "Preview image of " + this.title,
            path: assetsPath + this.image.path + thumbnail
          } : this.imagePreview;
          if (this.images.length == 1) {
            this.image = this.images[0];
          } else {
            this.isCarousel = true;
          }
        }
      }
    }
    /*
    if(this.image.id == "firebase_link"){
      if(this.image.path.endsWith("/")){
        this.storage.ref('/'+this.image.path).listAll().subscribe({
          next: (list:ListResult) => {
            list.items.forEach((itemRef) => {
              itemRef.getDownloadURL().then((url: string) => {
                this.images.push({
                  id:itemRef.fullPath,
                  name:this.image.name,
                  alt:this.image.alt,
                  path:url
                })
              });
            });
          }, 
          error: (e) => console.log(e),
          complete: () => {
            this.hasImage = true;
            this.isCarousel = true;
            this.imagePreview === undefined ? this.preview = this.images[0] : this.preview = this.imagePreview;
            this.preview = this.images[0];
            //console.log(this.images);
          }
        })
      }
    }
    */
  }
}
