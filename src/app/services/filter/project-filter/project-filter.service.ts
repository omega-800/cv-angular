import { Injectable } from '@angular/core';
import { FilterCategoryEntity, FiltersEntity } from '../filter.model';
import { ProjectService } from '../../project/project/project.service';
import { PersonEntity } from '../../person/person/person.model';
import { ProjectEntity } from '../../project/project/project.model';
import { CareerEntity } from '../../career/career/career.model';
import { ClientEntity } from '../../project/client/client.model';
import { linkTypes } from 'src/app/components/components.constants';
import { LinkType } from 'src/app/components/components.model';
import { projectFilterProps } from './project-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectFilterService {/*
  linksFilters: FilterCategoryEntity;
  authorFilters: FilterCategoryEntity;
  careerFilters: FilterCategoryEntity;
  clientFilters: FilterCategoryEntity;
  projectFilters: FiltersEntity;*/

  constructor(private projectService: ProjectService) { /*
    this.linksFilters = this.getLinksFilters([""]);
    this.authorFilters = this.getAuthorFilters();*/
  }

  getProjectFiltersOfProjects(projects: ProjectEntity[]): FiltersEntity {
    let links: LinkType[] = [];
    let authors: PersonEntity[] = [];
    let careers: CareerEntity[] = [];
    let clients: ClientEntity[] = [];
    let clientPerson: PersonEntity[] = [];
    let filters: FilterCategoryEntity[] = [];

    projects.forEach(project => {
      if (!links.some(link => link.id == linkTypes.GITHUB.id) && project.github !== undefined) { links.push(linkTypes.GITHUB) }
      if (!links.some(link => link.id == linkTypes.URL.id) && project.url !== undefined) { links.push(linkTypes.URL) }
      project.authors.forEach(author => {
        if (!authors.some(elem => elem.person_id == author.person_id)) { authors.push(author) }
      })
      project.clients.forEach(client => {
        if (!clients.some(elem => elem.client_id == client.client_id)) { clients.push(client) }
      })
      if (project.career !== undefined && !careers.some(elem => elem.career_id == project.career.career_id)) { careers.push(project.career) }
      if (project.client !== undefined && !clientPerson.some(elem => elem.person_id == project.client.person_id)) {
        clientPerson.push(project.client);
        clients.push({ client_id: project.client.person_id, id: project.client.person_id, name: project.client.firstname, description: project.client.firstname + " " + project.client.lastname, url: "mailto:" + project.client.contact.email })
      }
    })

    if (links.length > 0) { filters.push(this.getLinksFilters(links)) }
    if (authors.length > 1) { filters.push(this.getAuthorFilters(authors)) }
    if (careers.length > 1) { filters.push(this.getCareerFilters(careers)) }
    if (clients.length > 1) { filters.push(this.getClientFilters(clients)) }

    return {
      id: "filter_project",
      name: "Projects",
      categories: filters
    }
  }

  getLinksFilters(links: LinkType[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.link,
      name: "Links",
      selected: true,
      tags: links.map(link => {
        return { id: projectFilterProps.link + "_" + link.name, name: "Hat " + link.name, selected: false, value: link.id }
      })
    };
  }

  getAuthorFilters(authors: PersonEntity[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.author,
      name: "Authoren",
      selected: true,
      tags: authors.map(author => {
        return { id: projectFilterProps.author + "_" + author.name, name: author.name, selected: false, value: author.person_id }
      })
    };
  }

  getCareerFilters(careers: CareerEntity[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.career,
      name: "Karriere",
      selected: true,
      tags: careers.map(career => {
        return { id: projectFilterProps.career + "_" + career.name, name: career.name, selected: false, value: career.career_id }
      })
    };
  }

  getClientFilters(clients: ClientEntity[]): FilterCategoryEntity {
    return {
      id: projectFilterProps.client,
      name: "Klient",
      selected: true,
      tags: clients.map(client => {
        return { id: projectFilterProps.client + "_" + client.name, name: client.name, selected: false, value: client.client_id }
      })
    };
  }
}
