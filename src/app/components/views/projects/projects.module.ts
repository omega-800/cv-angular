import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from 'src/app/services/project/project/project.service';
import { ProjectsRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  providers: [ProjectService],
})
export class ProjectsModule { }
