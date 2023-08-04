import { Component, OnInit, inject } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { ProjectService } from 'src/app/services/project/project/project.service';
import { openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { LinkTypes } from '../../components.model';
import { CareerEntity, CareerTypes, careerTypes } from 'src/app/services/career/career/career.model';
import { CareerService } from 'src/app/services/career/career/career.service';
import { PersonService } from 'src/app/services/person/person/person.service';
import { PersonEntity } from 'src/app/services/person/person/person.model';
import { SkillsFilterService } from 'src/app/services/filter/skills-filter/skills-filter.service';
import {
  projectSortProps,
  projectSortValues,
} from 'src/app/pipes/projects-sort/projects-sort.model';
import {
  FiltersEntity,
  SortEntity,
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
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { URLParams } from 'src/app/app.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  host: { 'class': 'wrapper' },
  standalone: true,
  imports: [DatePipe, ProjectsSortPipe, ProjectsFilterPipe, FilterComponent, SortComponent, ContentboxComponent, ButtonComponent, SkillItemComponent, NgFor, NgIf],
  providers: [SkillsFilterPipe]
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

  selectedProjectID: string = '';

  constructor(
    projectService: ProjectService,
    private personService: PersonService,
    skillsFilterService: SkillsFilterService,
    projectFilterService: ProjectFilterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller
  ) {
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
    this.filters = [projectFilterService.getProjectFiltersOfProjects(this.projects), skillsFilterService.getSkillFiltersOfSkills(this.projectSkills)]
  }

  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe(fragment => this.selectedProjectID = fragment || '');
  }

  ngAfterViewInit(): void {
    try {
      setTimeout(() => this.scroller.scrollToAnchor(this.selectedProjectID), 800)
    } catch (e) { }
  }

  filterProjects(selected: FiltersEntity[]) {
    this.selectedFilters = selected;
  }

  sortProjectsBy(selected: { value: SortEntity; ascending: boolean }) {
    this.sortValue = selected.value;
    this.sortAsc = selected.ascending;
  }

  ol = (href: string) => {
    openLink(href);
  };

  openClient = (id: string) => {
    let person: PersonEntity = this.personService.getPersonById(id);
    openLink('/careers#' + person.name);
  };

  goToCareer(careerID: string) {
    this.router.navigate(['../career'], { fragment: careerID, relativeTo: this.activatedRoute, queryParamsHandling: "merge" });
  }
}
