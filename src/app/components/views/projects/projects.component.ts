import { Component, OnInit, inject } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { ProjectService } from 'src/app/services/project/project/project.service';
import { openLink } from '../../general/links.util';
import {
  authMessage,
  linkTypes,
  lockIcon,
  loginMessage,
} from '../../components.constants';
import { LinkTypes } from '../../components.model';
import {
  CareerEntity,
  CareerTypes,
  careerTypes,
} from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { PersonService } from 'src/app/services/person/person/person.service';
import { PersonEntity } from 'src/app/services/person/person/person.model';
import { SkillsFilterService } from 'src/app/services/filter/skills-filter/skills-filter.service';
import {
  projectSortProps,
  projectSortValues,
} from 'src/app/pipes/projects-sort/projects-sort.model';
import {
  FilterCategoryEntity,
  FiltersEntity,
  SortEntity,
  TagEntity,
} from 'src/app/services/filter/filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { ProjectFilterService } from 'src/app/services/filter/project-filter/project-filter.service';
import { DatePipe } from 'src/app/pipes/date/date.pipe';
import { ProjectsFilterPipe } from 'src/app/pipes/projects-filter/projects-filter.pipe';
import { ProjectsSortPipe } from 'src/app/pipes/projects-sort/projects-sort.pipe';
import { FilterComponent } from '../../general/filter/filter.component';
import { ContentboxComponent } from '../../general/contentbox/contentbox.component';
import { SortComponent } from '../../general/sort/sort.component';
import { ButtonComponent } from '../../general/button/button.component';
import { SkillItemComponent } from '../../general/skills/skill-item/skill-item.component';
import { NgFor, NgIf, ViewportScroller } from '@angular/common';
import { SkillsFilterPipe } from 'src/app/pipes/skills-filter/skills-filter.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { projectFilterProps } from 'src/app/services/filter/project-filter/project-filter.model';
import { SkillService } from 'src/app/services/skills/skill/skill.service';
import { BehaviorSubject } from 'rxjs';
import { LeftToRightAnimationIncrement } from 'src/app/animations';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  host: { class: 'wrapper' },
  standalone: true,
  imports: [
    DatePipe,
    ProjectsSortPipe,
    ProjectsFilterPipe,
    FilterComponent,
    SortComponent,
    ContentboxComponent,
    ButtonComponent,
    SkillItemComponent,
    NgFor,
    NgIf,
  ],
  providers: [SkillsFilterPipe],
  animations: [LeftToRightAnimationIncrement],
})
export class ProjectsComponent implements OnInit {
  projects: ProjectEntity[];
  lt: LinkTypes = linkTypes;
  filters: FiltersEntity[];
  ct: CareerTypes = careerTypes;

  sortFields: SortEntity[] = projectSortProps;
  sortValue: SortEntity = {
    id: projectSortValues.date,
    value: projectSortValues.date,
    name: projectSortValues.date,
  };
  sortAsc: boolean = true;

  projectSkills: SkillEntity[] = [];
  selectedSkillFilter: FiltersEntity[] = [];
  selectedProjectFilter: FiltersEntity[] = [];
  selectedFilters: FiltersEntity[] = [];

  selectedProject?: ProjectEntity;
  selectedSkill?: SkillEntity;

  additionalFilterCategories: FiltersEntity[] = [];
  additionalFilter$: BehaviorSubject<FiltersEntity[]> = new BehaviorSubject<
    FiltersEntity[]
  >(this.additionalFilterCategories);

  loggedIn: boolean = false;
  isAuth: boolean = false;

  authMessage = authMessage;
  loginMessage = loginMessage;

  constructor(
    private projectService: ProjectService,
    private skillService: SkillService,
    skillsFilterService: SkillsFilterService,
    projectFilterService: ProjectFilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scroller: ViewportScroller,
    authService: AuthService
  ) {
    authService.isLoggedIn.subscribe((loggedIn) => (this.loggedIn = loggedIn));
    authService.isAuthenticated.subscribe((isAuth) => (this.isAuth = isAuth));
    this.projects = projectService.getProjects();
    this.projects.forEach((project) => {
      project.skills.forEach((skill) => {
        if (
          !this.projectSkills.some((elem) => elem.skill_id == skill.skill_id)
        ) {
          this.projectSkills.push(skill);
        }
      });
    });
    this.filters = [
      projectFilterService.getProjectFiltersOfProjects(this.projects),
      skillsFilterService.getSkillFiltersOfSkills(this.projectSkills),
    ];
    this.additionalFilterCategories = [
      JSON.parse(JSON.stringify({ ...this.filters[0], categories: [] })),
    ];
  }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((fragment) =>
      this.setSelectedProject(fragment)
    );
    this.activatedRoute.queryParamMap.subscribe((param) =>
      this.setSelectedSkill(param.get('skillID'))
    );
    //this.store.select(state => state.app.interest).subscribe(res => this.setInterestFilter(res));
  }

  setSelectedProject(projectID: string | null) {
    if (projectID != null) {
      this.selectedProject = this.projectService.getProjectById(projectID);
      this.additionalFilterCategories[0].categories = [
        {
          id: projectFilterProps.selected,
          name: 'Ausgewähltes Projekt',
          isRange: false,
          tags: [
            {
              id: '',
              name: this.selectedProject.name,
              value: this.selectedProject.project_id,
              selected: true,
            },
          ],
        },
      ];
      this.additionalFilter$.next(this.additionalFilterCategories);
      setTimeout(() => this.additionalFilter$.next([]), 500);
      this.router.navigate([], { fragment: undefined });
    }
  }

  setSelectedSkill(skillID: string | null) {
    if (skillID != null) {
      this.selectedSkill = this.skillService.getSkillById(skillID);
      this.additionalFilterCategories[0].categories = [
        {
          id: projectFilterProps.skill,
          name: 'Ausgewählter Skill',
          isRange: false,
          tags: [
            {
              id: '',
              name: this.selectedSkill.name,
              value: this.selectedSkill.skill_id,
              selected: true,
            },
          ],
        },
      ];
      this.additionalFilter$.next(this.additionalFilterCategories);
      setTimeout(() => this.additionalFilter$.next([]), 500);
      this.router.navigate([], {
        queryParams: { skillID: undefined },
        queryParamsHandling: 'merge',
      });
      setTimeout(
        () => { this.scroller.scrollToPosition([0, 0]); console.log("scrolled") },
        800
      );
    }
  }

  ngAfterViewInit(): void {
    try {
      if (this.selectedProject != undefined) {
        setTimeout(
          () => this.scroller.scrollToAnchor(this.selectedProject!.id),
          800
        );
      }
    } catch (e) { }
  }

  filterProjects(selected: FiltersEntity[]) {
    this.selectedFilters = selected;
    /*let projectFilter = this.selectedFilters.find(filter => filter.id == this.filters[0].id)
    if (projectFilter != undefined) {
      if (undefined == projectFilter.categories.find(cat => cat.id == projectFilterProps.relevance)) {
        this.router.navigate([])
      }
      if (undefined == projectFilter.categories.find(cat => cat.id == projectFilterProps.skill)) {
        this.router.navigate([], { queryParams: { skillID: undefined }, queryParamsHandling: "merge" })
      }
      if (undefined == projectFilter.categories.find(cat => { cat.id == projectFilterProps.selected })) {
        this.router.navigate([], { fragment: undefined })
      }
    } else {
      this.router.navigate([], { fragment: undefined, queryParams: { skillID: undefined }, queryParamsHandling: "merge" })
    }*/
  }

  sortProjectsBy(selected: { value: SortEntity; ascending: boolean }) {
    this.sortValue = selected.value;
    this.sortAsc = selected.ascending;
  }

  ol = (href: string) => {
    openLink(href);
  };

  openClient = (id: string) => {
    //let person: PersonEntity = this.personService.getPersonById(id);
    //openLink('/careers#' + person.name);
  };

  goToCareer(careerID: string) {
    this.router.navigate(['../career'], {
      fragment: careerID,
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  getLockedProjectsCount(): number {
    return this.projectService.getNrOfLockedProjects();
  }
}
