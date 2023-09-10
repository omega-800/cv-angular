import { Injectable } from '@angular/core';
import {
  FilterCategoryEntity,
  FilterTypes,
  FiltersEntity,
} from '../filter.model';
import { PersonEntity } from '../../person/person/person.model';
import { ProjectEntity } from '../../project/project/project.model';
import { CareerEntity } from '../../career/career/career.model';
import { ClientEntity } from '../../project/client/client.model';
import { linkTypes } from 'src/app/components/components.constants';
import { LinkType } from 'src/app/components/components.model';
import { projectFilterProps } from './project-filter.model';
import { Interest } from 'src/app/store/app/app.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectFilterService {

  getProjectFiltersOfProjects(projects: ProjectEntity[]): FiltersEntity {
    let relevanceIt: number[] = [];
    let relevanceHealth: number[] = [];
    let relevanceArt: number[] = [];
    let relevanceEducation: number[] = [];
    let links: LinkType[] = [];
    let authors: PersonEntity[] = [];
    let careers: CareerEntity[] = [];
    let clients: ClientEntity[] = [];
    let clientPerson: PersonEntity[] = [];
    let dates: Date[] = [];
    let filters: FilterCategoryEntity[] = [];

    projects.forEach((project) => {
      if (project.relevance_it !== undefined && !relevanceIt.includes(project.relevance_it)) relevanceIt.push(project.relevance_it)
      if (project.relevance_health !== undefined && !relevanceHealth.includes(project.relevance_health)) relevanceHealth.push(project.relevance_health)
      if (project.relevance_education !== undefined && !relevanceEducation.includes(project.relevance_education)) relevanceEducation.push(project.relevance_education)
      if (project.relevance_art !== undefined && !relevanceArt.includes(project.relevance_art)) relevanceArt.push(project.relevance_art)

      if (
        !links.some((link) => link.id == linkTypes.GITHUB.id) &&
        project.github !== undefined
      ) {
        links.push(linkTypes.GITHUB);
      }
      if (
        !links.some((link) => link.id == linkTypes.URL.id) &&
        project.url !== undefined
      ) {
        links.push(linkTypes.URL);
      }
      project.authors.forEach((author) => {
        if (!authors.some((elem) => elem.person_id == author.person_id)) {
          authors.push(author);
        }
      });
      project.clients.forEach((client) => {
        if (!clients.some((elem) => elem.client_id == client.client_id)) {
          clients.push(client);
        }
      });
      if (
        project.career !== undefined &&
        !careers.some((elem) => elem.career_id == project.career.career_id)
      ) {
        careers.push(project.career);
      }
      if (
        project.client !== undefined &&
        !clientPerson.some((elem) => elem.person_id == project.client.person_id)
      ) {
        clientPerson.push(project.client);
        clients.push({
          client_id: project.client.person_id,
          id: project.client.person_id,
          name: project.client.firstname,
          description: project.client.firstname + ' ' + project.client.lastname,
          url: 'mailto:' + project.client.contact.email,
        });
      }
      if (
        !dates.some((date) => date.getFullYear() == project.date.getFullYear())
      ) {
        dates.push(project.date);
      }
    });

    let amountIt = 8;
    let amountArt = 6;
    let amountHealth = 4;
    let amountEducation = 1;

    let relevanceTags = [];
    if (relevanceIt.length > amountIt) relevanceTags.push({
      id: Interest.IT,
      name: 'Relevant',
      selected: true,
      value: relevanceIt.sort((a, b) => b - a).slice(amountIt - 1, amountIt)[0],
    })
    if (relevanceArt.length > amountArt) relevanceTags.push({
      id: Interest.ART,
      name: 'Relevant',
      selected: true,
      value: relevanceArt.sort((a, b) => b - a).slice(amountArt - 1, amountArt)[0],
    })
    if (relevanceHealth.length > amountHealth) relevanceTags.push({
      id: Interest.HEALTH,
      name: 'Relevant',
      selected: true,
      value: relevanceHealth.sort((a, b) => b - a).slice(amountHealth - 1, amountHealth)[0],
    })
    if (relevanceEducation.length > amountEducation) relevanceTags.push({
      id: Interest.EDUCATION,
      name: 'Relevant',
      selected: true,
      value: relevanceEducation.sort((a, b) => b - a).slice(amountEducation - 1, amountEducation)[0],
    })

    if (relevanceTags.length > 0) {
      filters.push({
        id: projectFilterProps.relevance,
        name: 'Relevance',
        selected: true,
        isRange: false,
        tags: relevanceTags
      });
    }
    if (careers.length > 0) {
      filters.push(this.getCareerFilters(careers));
    }
    if (authors.length > 0) {
      filters.push(this.getAuthorFilters(authors));
    }
    if (links.length > 0) {
      filters.push(this.getLinksFilters(links));
    }
    if (clients.length > 0) {
      filters.push(this.getClientFilters(clients));
    }
    if (dates.length > 2) {
      filters.push(this.getDateRange(dates));
    }

    return {
      id: FilterTypes.PROJECT,
      type: FilterTypes.PROJECT,
      name: 'Projekt',
      categories: filters,
    };
  }

  getLinksFilters(links: LinkType[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.link,
      name: 'Links',
      isRange: false,
      selected: false,
      tags: links.map((link) => {
        return {
          id: projectFilterProps.link + '_' + link.name,
          name: link.name,
          selected: false,
          value: link.id,
        };
      }),
    };
  }

  getAuthorFilters(authors: PersonEntity[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.author,
      name: 'Authoren',
      selected: false,
      isRange: false,
      tags: authors.map((author) => {
        return {
          id: projectFilterProps.author + '_' + author.name,
          name: author.name,
          selected: false,
          value: author.person_id,
        };
      }),
    };
  }

  getCareerFilters(careers: CareerEntity[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.career,
      name: 'Karriere',
      isRange: false,
      selected: true,
      tags: careers.map((career) => {
        return {
          id: projectFilterProps.career + '_' + career.name,
          name: career.school ? career.school.name : career.workplace ? career.workplace.name : career.name,
          selected: false,
          value: career.career_id,
        };
      }),
    };
  }

  getClientFilters(clients: ClientEntity[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.client,
      name: 'Klient',
      selected: false,
      isRange: false,
      tags: clients.map((client) => {
        return {
          id: projectFilterProps.client + '_' + client.name,
          name: client.name,
          selected: false,
          value: client.client_id,
        };
      }),
    };
  }

  getDateRange(dates: Date[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.date,
      name: 'Jahr',
      isRange: true,
      selected: false,
      step: 1,
      tags: dates
        .filter((date) => !isNaN(Number(date)))
        .map((date) => {
          return {
            id: projectFilterProps.date + '_' + date.getFullYear().toString(),
            name: date.getFullYear().toString(),
            selected: false,
            value: date.getFullYear(),
          }
        })
        .sort((a, b) => a.value - b.value),
    };
  }
}
