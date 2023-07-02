import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'career',
    loadChildren: () => import('./components/views/career/career.module').then(m => m.CareerModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./components/views/projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./components/views/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
