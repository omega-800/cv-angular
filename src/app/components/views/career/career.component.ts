import { Component } from '@angular/core';
import { CareerEntity, CareerTypes, careerTypes } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { contactIcon, addressIcon } from '../../components.constants';
import { ImageComp } from '../../components.model';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent {
  careers:CareerEntity[];
  ct:CareerTypes = careerTypes;
  contactIcon:ImageComp = contactIcon;
  addressIcon:ImageComp = addressIcon;

  constructor(private careerService:CareerService){
    this.careers = careerService.getCareers();
  }
}

