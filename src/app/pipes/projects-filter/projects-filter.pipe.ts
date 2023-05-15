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
        let applies: boolean = false;
        project.skills.forEach(skill => {
          if (!applies) {
            applies = this.skillsFilterPipe.filtersApplyTo(skill, skillFilters)
          }
        });
        projectFilters.forEach(filter => {
          if (!applies) {
            applies = filter.category === projectFilterProps.link ? (filter.value == linkTypes.URL.id ? project.url != "" : filter.value == linkTypes.GITHUB.id ? project.github != "" : false) :
              filter.category === projectFilterProps.author ? project.authors.some(author => author.person_id == filter.value) :
                filter.category === projectFilterProps.career ? project.career !== undefined && project.career.career_id == filter.value :
                  filter.category === projectFilterProps.client ? ((project.client !== undefined && project.client.person_id == filter.value) || (project.clients.some(client => client.client_id == filter.value))) : false;
          }
        });
        return applies;
      });
    }

    return projects;
  }

}