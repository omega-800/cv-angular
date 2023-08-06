import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ImageComp, LinkTypes } from '../../components.model';
import { Direction, arrowIcon, linkTypes, lockIcon } from '../../components.constants';
import * as assets from 'src/assets/fileStructure.json';
import { CarouselComponent } from '../carousel/carousel.component';
import { ImageComponent } from '../image/image.component';
import { NgIf } from '@angular/common';
import { DropDownAnimation } from 'src/app/animations';
import { openLink } from '../links.util';
import { ButtonComponent } from '../button/button.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-contentbox',
  templateUrl: './contentbox.component.html',
  styleUrls: ['./contentbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CarouselComponent, ImageComponent, NgIf, ButtonComponent, TooltipComponent],
  animations: [DropDownAnimation]
})
export class ContentboxComponent implements OnInit {
  @Input() title!: string;
  @Input() subTitle?: string;
  @Input() subSubTitle?: string;
  @Input() description!: string;
  @Input() link?: string;
  @Input() image!: ImageComp;
  @Input() imagePreview?: ImageComp;
  @Input() selected?: boolean;
  @Input() locked?: boolean;
  lt: LinkTypes = linkTypes;
  d = Direction;

  arrowIcon: ImageComp = arrowIcon;
  lockIcon = lockIcon;
  isCarousel: boolean = false;
  isActive: boolean = false;
  hasImage: boolean = false;
  images: ImageComp[] = [];
  preview: ImageComp = { id: "", name: "", alt: "", path: "" };
  main: ImageComp = { id: "", name: "", alt: "", path: "" };

  constructor() {
  }

  ngOnInit() {
    this.isActive = this.selected || false;
    const thumbnail: string = "thumbnail.webp";
    this.preview = this.imagePreview === undefined ? this.image : this.imagePreview;
    if (this.image.path != "") {
      if (!this.image.path.endsWith("/")) {
        this.hasImage = true;
      } else {
        let files = assets["src/" + this.image.path.slice(0, -1) as keyof typeof assets];
        if (files && files.length > 0) {
          this.hasImage = true;
          this.images = files.filter(file => { return file !== thumbnail }).map(file => {
            return {
              id: file,
              name: this.title + " " + file,
              alt: "Image of " + this.title,
              path: this.image.path + file
            }
          })
          this.preview = this.imagePreview === undefined ? {
            id: "image_" + this.title,
            name: this.title,
            alt: "Preview image of " + this.title,
            path: this.image.path + thumbnail
          } : this.imagePreview;
          if (this.images.length == 1) {
            this.image = this.images[0];
          } else {
            this.isCarousel = true;
          }
        }
      }
    }
  }

  ol(href: string) {
    openLink(href)
  }
}
