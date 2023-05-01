import { Component, Input, OnInit } from '@angular/core';
import { ImageComponent } from '../../components.model';
import { arrowIcon } from '../../components.constants';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ListResult } from '@angular/fire/compat/storage/interfaces';

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
  @Input() image!: ImageComponent;
  @Input() imagePreview?: ImageComponent;
  arrowIcon:ImageComponent = arrowIcon;
  isCarousel:boolean = false;
  images: ImageComponent[] = [];
  hasImage:boolean = false;

  constructor (private storage:AngularFireStorage) {
  }

  ngOnInit(){
    
  }
}
