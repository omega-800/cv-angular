import { Pipe, PipeTransform } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project/project.model';
import { SortEntity } from 'src/app/services/filter/filter.model';
import { projectSortValues } from './projects-sort.model';

@Pipe({
  name: 'projectsSort'
})
export class ProjectsSortPipe implements PipeTransform {

  transform(projects: ProjectEntity[], sortBy: SortEntity, ascending: boolean): ProjectEntity[] {
    if (!projects) {
      return projects;
    }
    if (sortBy) {
      if (sortBy.value === projectSortValues.date) {
        projects = projects.sort((a, b) => isNaN(Number(a.date)) ? 1 : isNaN(Number(b.date)) ? -1 :
          a.date > b.date ?
            (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === projectSortValues.career) {
        projects = projects.sort((a, b) => a.career === undefined ? 1 : b.career === undefined ? -1 :
          a.career.name.toLowerCase() > b.career.name.toLowerCase() ?
            (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === projectSortValues.name) {
        projects = projects.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === projectSortValues.client) {
        projects = projects.sort((a, b) => a.client === undefined ? 1 : b.client === undefined ? -1 :
          a.client.name.toLowerCase() > b.client.name.toLowerCase() ?
            (ascending ? 1 : -1) : (ascending ? -1 : 1));
      } else if (sortBy.value === projectSortValues.author) {
        projects = projects.sort((a, b) => a.authors[0].name.toLowerCase() > b.authors[0].name.toLowerCase() ?
          (ascending ? 1 : -1) : (ascending ? -1 : 1));;
      }
    }
    return projects;
  }

}
