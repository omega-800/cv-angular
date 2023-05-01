import { Component } from '@angular/core';
import { ProjectEntity } from 'src/app/services/project/project.model';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects:ProjectEntity[];

  constructor(private projectService:ProjectService) {
    this.projects = projectService.getProjects();
    //this.projects = [projectService.getProjectById("60d8c8bc-3061-406c-80bf-6188a236a7c1")];
  }
}
