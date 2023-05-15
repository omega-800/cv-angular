import { Injectable } from '@angular/core';
import { ApplicationEntity, ApplicationOnly, ApplicationTypeOnly, ApplicationTypeEntity } from './application.model';
import * as applicationData from 'src/data/application.json'
import * as applicationTypeData from 'src/data/applicationtype.json'

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  private onlyApplications: ApplicationOnly[] = (applicationData as any).default;
  private onlyApplicationTypes: ApplicationTypeOnly[] = (applicationTypeData as any).default;

  private applicationTypes: ApplicationTypeEntity[];
  private applications: ApplicationEntity[];

  constructor() {
    this.applicationTypes = this.onlyApplicationTypes.map(type => { return { ...type, id: "application_" + type.applicationtype_id } });
    this.applications = this.onlyApplications.map(app => this.fillApplicationType(app));
  }

  getApplications(): ApplicationEntity[] {
    return this.applications;
  }

  getApplicationTypes(): ApplicationTypeEntity[] {
    return this.applicationTypes;
  }

  getApplicationById(id: string): ApplicationEntity {
    return Object.values(this.applications).filter(application => application.application_id === id)[0];
  }

  getApplicationTypeById(id: string): ApplicationTypeEntity {
    return Object.values(this.applicationTypes).filter(applicationtype => applicationtype.applicationtype_id === id)[0];
  }

  fillApplicationType(app: ApplicationOnly): ApplicationEntity {
    return { ...app, applicationtype: this.getApplicationTypeById(app.applicationtype_id), id: app.application_id };
  }
}
