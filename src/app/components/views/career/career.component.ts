import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CareerEntity, CareerTypes, careerTypes } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { contactIcon, addressIcon, arrowIcon, urlIcon } from '../../components.constants';
import { ImageComp } from '../../components.model';
import { openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { LinkTypes } from '../../components.model';
import { ContentboxComponent } from '../../general/contentbox/contentbox.component';
import { SkillsPercentComponent } from '../../general/skills/skills-percent/skills-percent.component';
import { ButtonComponent } from '../../general/button/button.component';
import { ContactpointComponent } from '../../general/contactpoint/contactpoint.component';
import { AddressComponent } from '../../general/address/address.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  host: { 'class': 'wrapper' },
  standalone: true,
  imports: [ContentboxComponent, SkillsPercentComponent, ButtonComponent, ContactpointComponent, AddressComponent, NgFor, NgIf]
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

