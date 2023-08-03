import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/views/home/home.component').then(m => m.HomeComponent) },
  { path: 'career', loadComponent: () => import('./components/views/career/career.component').then(m => m.CareerComponent) },
  { path: 'projects', loadComponent: () => import('./components/views/projects/projects.component').then(m => m.ProjectsComponent) },
  { path: '**', loadComponent: () => import('./components/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) },
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
