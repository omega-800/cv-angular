import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { ProjectService } from 'src/app/services/project/project/project.service';
import { openLink } from '../../general/links.util';
import { linkTypes } from '../../components.constants';
import { LinkTypes } from '../../components.model';
import { CareerEntity } from 'src/app/services/career/career/career.model';
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
  SelectedFilterEntity,
  SortEntity,
} from 'src/app/services/filter/filter.model';
import { SkillEntity } from 'src/app/services/skills/skill/skill.model';
import { ProjectFilterService } from 'src/app/services/filter/project-filter/project-filter.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects: ProjectEntity[];
  lt: LinkTypes = linkTypes;
  skillsFilter: FiltersEntity;
  projectsFilter: FiltersEntity;

  sortFields: SortEntity[] = projectSortProps;
  sortValue: SortEntity = {
    id: projectSortValues.date,
    value: projectSortValues.date,
    name: projectSortValues.date,
  };
  sortAsc: boolean = true;

  projectSkills: SkillEntity[] = [];
  selectedSkillFilter: SelectedFilterEntity[] = [];
  selectedProjectFilter: SelectedFilterEntity[] = [];

  constructor(
    projectService: ProjectService,
    private careerService: CareerService,
    private personService: PersonService,
    skillsFilterService: SkillsFilterService,
    projectFilterService: ProjectFilterService
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
    this.skillsFilter = skillsFilterService.getSkillFiltersOfSkills(
      this.projectSkills
    );
    this.projectsFilter = projectFilterService.getProjectFiltersOfProjects(
      this.projects
    );
  }

  filterProjectsBySkill(selected: SelectedFilterEntity[]) {
    this.selectedSkillFilter = selected;
  }

  filterProjects(selected: SelectedFilterEntity[]) {
    this.selectedProjectFilter = selected;
  }

  sortProjectsBy(selected: { value: SortEntity; ascending: boolean }) {
    this.sortValue = selected.value;
    this.sortAsc = selected.ascending;
  }

  ol = (href: string) => {
    return () => openLink(href);
  };

  openCareer = (id: string) => {
    let career: CareerEntity = this.careerService.getCareerById(id);
    return () => openLink('/careers#' + career.name);
  };

  openClient = (id: string) => {
    let person: PersonEntity = this.personService.getPersonById(id);
    return () => openLink('/careers#' + person.name);
  };
}
