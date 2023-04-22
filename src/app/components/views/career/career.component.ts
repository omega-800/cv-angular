import { Component } from '@angular/core';
import { ImageComponent } from '../../components.model';
import { CareerEntity, CareerTypes, careerTypes } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent {
  careers:CareerEntity[];
  ct:CareerTypes = careerTypes;

  constructor(careerService:CareerService){
    this.careers = careerService.getCareers();
  }
}
