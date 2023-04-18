import { Injectable } from '@angular/core';
import { Application, ApplicationOnly, ApplicationType } from './application.model';
import * as applicationData from 'src/data/application.json'
import * as applicationTypeData from 'src/data/applicationtype.json'

@Injectable({
  providedIn: 'root'
})

export class ApplicationService {
  applications:Application[];
  onlyApplications:ApplicationOnly[];
  applicationTypes:ApplicationType[];

  constructor() {
    this.onlyApplications = (applicationData as any).default;
    this.applicationTypes = (applicationTypeData as any).default;
    this.applications = this.onlyApplications.map(app => this.fillApplicationType(app));
  }

  getApplications():Application[] {
    return this.applications;
  }
  
  getApplicationTypes():ApplicationType[] {
    return this.applicationTypes;
  }

  getApplicationById(id:string):Application {
    return Object.values(this.applications).filter(application => application.application_id === id)[0];
  }
  
  getApplicationTypeById(id:string):ApplicationType {
    return Object.values(this.applicationTypes).filter(applicationtype => applicationtype.applicationtype_id === id)[0];
  }

  fillApplicationType(app:ApplicationOnly):Application {
    return {...app, applicationtype: this.getApplicationTypeById(app.applicationtype_id)};
  }
}
