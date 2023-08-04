import { Pipe, PipeTransform } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { SkillsFilterPipe } from '../skills-filter/skills-filter.pipe';
import { linkTypes } from 'src/app/components/components.constants';
import { projectFilterProps } from 'src/app/services/filter/project-filter/project-filter.model';
import { FilterTypes, FiltersEntity } from 'src/app/services/filter/filter.model';

@Pipe({
  name: 'projectsFilter',
  pure: false,
  standalone: true
})
export class ProjectsFilterPipe implements PipeTransform {

  constructor(private skillsFilterPipe: SkillsFilterPipe) {
  }

  transform(projects: ProjectEntity[], filters: FiltersEntity[], excludeProjectID: string, ...args: string[]): ProjectEntity[] {

    let skillFilters = filters.find(elem => elem.type == FilterTypes.SKILL)?.categories;
    let projectFilters = filters.find(elem => elem.type == FilterTypes.PROJECT)?.categories;

    if (projects && ((skillFilters && skillFilters.length > 0) || (projectFilters && projectFilters.length > 0))) {
      return projects.filter(project => {
        if (project.id == excludeProjectID) return true;
        let appliesRange: boolean = false;
        if (projectFilters != undefined && projectFilters.some(filter => filter.isRange)) {
          projectFilters.forEach(filter => {
            if (filter.isRange && filter.id === projectFilterProps.date && !isNaN(Number(project.date))) {
              let min: number = Number(filter.tags[0].value);
              let max: number = Number(filter.tags[1].value);
              if (min > max) {
                [min, max] = [max, min];
              }
              appliesRange = project.date.getFullYear() >= min && project.date.getFullYear() <= max;
            }
          });
        } else {
          appliesRange = true;
        }
        let appliesSkills: boolean = false;
        if (skillFilters != undefined) {
          project.skills.forEach(skill => {
            if (!appliesSkills) {
              appliesSkills = this.skillsFilterPipe.filtersApplyTo(skill, skillFilters!)
            }
          });
        } else {
          appliesSkills = true;
        }
        let appliesProjects: boolean = true;
        if (projectFilters != undefined) {
          projectFilters.forEach(filter => {
            if (appliesProjects && !filter.isRange) {
              appliesProjects = filter.id === projectFilterProps.link ? (filter.tags.some(elem => elem.value == linkTypes.URL.id) ? project.url != "" : filter.tags.some(elem => elem.value == linkTypes.GITHUB.id) ? project.github != "" : false) :
                filter.id === projectFilterProps.author ? project.authors.some(author => filter.tags.some(elem => elem.value == author.person_id)) :
                  filter.id === projectFilterProps.relevance ? Number(filter.tags[0].value) <= (project[`relevance_${filter.tags[0].id}` as keyof typeof project] as number) :
                    filter.id === projectFilterProps.career ? project.career !== undefined && filter.tags.some(elem => elem.value == project.career.career_id) :
                      filter.id === projectFilterProps.client ? ((project.client !== undefined && filter.tags.some(elem => elem.value == project.client.person_id)) || (project.clients.some(client => filter.tags.some(elem => elem.value == client.client_id)))) :
                        false;
            }
          });
        }
        return appliesRange && appliesSkills && appliesProjects;
      });
    }

    return projects;
  }

}
