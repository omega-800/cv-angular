import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from 'src/app/services/project/project/project.service';
import { ProjectsRoutingModule } from './projects-routing.module';
import { DatePipe } from 'src/app/pipes/date/date.pipe';
import { ProjectsFilterPipe } from 'src/app/pipes/projects-filter/projects-filter.pipe';
import { ProjectsSortPipe } from 'src/app/pipes/projects-sort/projects-sort.pipe';

@NgModule({
  declarations: [
    ProjectsComponent,
    DatePipe,
    ProjectsSortPipe,
    ProjectsFilterPipe,
  ],
  imports: [
    SharedModule,
    ProjectsRoutingModule
  ],
  providers: [
    ProjectService,
    DatePipe,
    ProjectsSortPipe,
    ProjectsFilterPipe,
  ],
})
export class ProjectsModule { }
