import { Pipe, PipeTransform } from '@angular/core';
import { SelectedFilterEntity } from 'src/app/services/filter/filter.model';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { SkillsFilterPipe } from '../skills-filter/skills-filter.pipe';

@Pipe({
  name: 'projectsFilter',
  pure: false
})
export class ProjectsFilterPipe implements PipeTransform {

  constructor(private skillsFilterPipe: SkillsFilterPipe) {
  }

  transform(projects:ProjectEntity[], skillFilters:SelectedFilterEntity[], ...args:string[]): ProjectEntity[] {
 
    if(projects && skillFilters && skillFilters.length != 0) {
      return projects.filter(project => {
        let matches:boolean = false;
        project.skills.forEach(skill => matches = matches ? true : this.skillsFilterPipe.filtersApplyTo(skill, skillFilters))
        return matches;
      });
    }

    return projects;
  }

}
