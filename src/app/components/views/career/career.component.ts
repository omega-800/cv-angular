import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CareerEntity, CareerTypeEntity, CareerTypes, careerTypes } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { contactIcon, addressIcon, arrowIcon, urlIcon, infoIcon, Direction, loginMessage, authMessage } from '../../components.constants';
import { ImageComp } from '../../components.model';
import { openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { LinkTypes } from '../../components.model';
import { ContentboxComponent } from '../../general/contentbox/contentbox.component';
import { SkillsPercentComponent } from '../../general/skills/skills-percent/skills-percent.component';
import { ButtonComponent } from '../../general/button/button.component';
import { ContactpointComponent } from '../../general/contactpoint/contactpoint.component';
import { AddressComponent } from '../../general/address/address.component';
import { NgFor, NgIf, ViewportScroller } from '@angular/common';
import { ProjectService } from 'src/app/services/project/project/project.service';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgVar } from 'src/app/directives/ng-var.directive';
import { DropDownAnimation, LeftToRightAnimation } from 'src/app/animations';
import { DatePipe } from 'src/app/pipes/date/date.pipe';
import { TooltipComponent } from '../../general/tooltip/tooltip.component';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
  host: { 'class': 'wrapper' },
  standalone: true,
  imports: [ContentboxComponent, SkillsPercentComponent, ButtonComponent, ContactpointComponent, AddressComponent, NgFor, NgIf, NgVar, DatePipe, TooltipComponent],
  animations: [DropDownAnimation, LeftToRightAnimation]
})
export class CareerComponent {
  careers: CareerEntity[];
  ct: CareerTypes = careerTypes;
  contactIcon: ImageComp = contactIcon;
  addressIcon: ImageComp = addressIcon;
  arrowIcon: ImageComp = arrowIcon;
  urlIcon: ImageComp = urlIcon;
  infoIcon: ImageComp = infoIcon;
  lt: LinkTypes = linkTypes;
  d = Direction;
  selectedCareerID: string = '';
  loggedIn = false;
  isAuth = false;
  loginMessage = loginMessage;
  authMessage = authMessage;

  constructor(
    careerService: CareerService,
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scroller: ViewportScroller,
    authService: AuthService
  ) {
    authService.isLoggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
    authService.isAuthenticated.subscribe(isAuth => this.isAuth = isAuth);
    this.careers = careerService.getCareers();
  }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe(fragment => this.selectedCareerID = fragment || '');
  }

  ngAfterViewInit(): void {
    try {
      setTimeout(() => this.scroller.scrollToAnchor(this.selectedCareerID), 800)
    } catch (e) { }
  }

  getProjects(careerID: string): ProjectEntity[] {
    return this.projectService.getProjectsByCareer(careerID);
  }

  getThumbnail(image: ImageComp): ImageComp {
    return image.path.endsWith("/") ? { ...image, path: image.path + 'thumbnail.webp' } : image
  }

  goToProject(project: ProjectEntity) {
    if (!project.anon_locked || this.loggedIn) {
      this.router.navigate(['../projects'], { fragment: project.project_id, relativeTo: this.activatedRoute, queryParamsHandling: "merge" });
    }
  }

  getDuration(from: Date, to: Date, pensum: number, ct: CareerTypeEntity): string {
    let allMls = to.getTime() - from.getTime();
    let totalMls = allMls / 7 * 5 / 24 * (8.5 * pensum / 100) / (ct == careerTypes.SCHOOL ? (360 * (360 - 91)) : (36 * 35)) / 10 * 9;
    let h = Math.round(totalMls / (3600 * 1000));
    return `~ ${h}h`;
  }

  ol = (href: string) => {
    openLink(href);
  }
}

