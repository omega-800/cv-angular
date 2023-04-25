import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/views/home/home.component';
import { CareerComponent } from './components/views/career/career.component';
import { PageNotFoundComponent } from './components/views/page-not-found/page-not-found.component';
import { ProjectsComponent } from './components/views/projects/projects.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'career', component: CareerComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
