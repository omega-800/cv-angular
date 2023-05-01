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

  constructor(projectService:ProjectService) {
    this.projects = projectService.getProjects();
  }
}
