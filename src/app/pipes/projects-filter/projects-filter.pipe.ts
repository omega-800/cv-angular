import { Pipe, PipeTransform } from '@angular/core';
import { SelectedFilterEntity } from 'src/app/services/filter/filter.model';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { SkillsFilterPipe } from '../skills-filter/skills-filter.pipe';
import { linkTypes } from 'src/app/components/components.constants';
import { projectFilterProps } from 'src/app/services/filter/project-filter/project-filter.model';

@Pipe({
  name: 'projectsFilter',
  pure: false
})
export class ProjectsFilterPipe implements PipeTransform {

  constructor(private skillsFilterPipe: SkillsFilterPipe) {
  }

  transform(projects: ProjectEntity[], skillFilters: SelectedFilterEntity[], projectFilters: SelectedFilterEntity[], ...args: string[]): ProjectEntity[] {

    if (projects && ((skillFilters && skillFilters.length > 0) || (projectFilters && projectFilters.length > 0))) {
      return projects.filter(project => {
        let appliesRange: boolean = false;
        if(projectFilters.some(filter => filter.range)){
          projectFilters.forEach(filter => {
            if (filter.range && filter.category === projectFilterProps.date && !isNaN(Number(project.date))) {
              let min: number = Number(filter.value[0]);
              let max: number = Number(filter.value[1]);
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
        project.skills.forEach(skill => {
          if (!appliesSkills) {
            appliesSkills = this.skillsFilterPipe.filtersApplyTo(skill, skillFilters)
          }
        });
        let appliesProjects: boolean = true;
        projectFilters.forEach(filter => {
          if (appliesProjects && !filter.range) {
            appliesProjects = filter.category === projectFilterProps.link ? (filter.value.includes(linkTypes.URL.id) ? project.url != "" : filter.value.includes(linkTypes.GITHUB.id) ? project.github != "" : false) :
              filter.category === projectFilterProps.author ? project.authors.some(author => filter.value.includes(author.person_id)) :
                filter.category === projectFilterProps.career ? project.career !== undefined && filter.value.includes(project.career.career_id) :
                  filter.category === projectFilterProps.client ? ((project.client !== undefined && filter.value.includes(project.client.person_id)) || (project.clients.some(client => filter.value.includes(client.client_id)))) :
                    false;
          }
        });
        return appliesRange && appliesSkills && appliesProjects;
      });
    }

    return projects;
  }

}
