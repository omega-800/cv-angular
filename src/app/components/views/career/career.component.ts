import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CareerEntity, CareerTypes, careerTypes } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { contactIcon, addressIcon, arrowIcon, urlIcon } from '../../components.constants';
import { ImageComp } from '../../components.model';
import { openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { LinkTypes } from '../../components.model';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  host: { 'class': 'wrapper' }
})
export class CareerComponent {
  careers: CareerEntity[];
  ct: CareerTypes = careerTypes;
  contactIcon: ImageComp = contactIcon;
  addressIcon: ImageComp = addressIcon;
  arrowIcon: ImageComp = arrowIcon;
  urlIcon: ImageComp = urlIcon;
  lt: LinkTypes = linkTypes;

  constructor(careerService: CareerService) {
    this.careers = careerService.getCareers();
  }

  ol = (href: string) => {
    return () => openLink(href);
  }
}

