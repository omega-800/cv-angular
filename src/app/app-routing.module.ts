import { NgModule } from '@angular/core';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/views/home/home.component').then(m => m.HomeComponent), data: { animation: 'HomePage' } },
  { path: 'career', loadComponent: () => import('./components/views/career/career.component').then(m => m.CareerComponent), data: { animation: 'CareerPage' } },
  { path: 'projects', loadComponent: () => import('./components/views/projects/projects.component').then(m => m.ProjectsComponent), data: { animation: 'ProjectsPage' } },
  { path: 'auth', loadComponent: () => import('./components/views/verified/verified.component').then(m => m.VerifiedComponent), data: { animation: 'ErrorPage' } },
  { path: '**', loadComponent: () => import('./components/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent), data: { animation: 'ErrorPage' } },
]
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, paramsInheritanceStrategy: 'always'/*, anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled', */ })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
