import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
      path: 'medecins',
      loadComponent: () => import('./pages/liste-medecins/liste-medecins.component').then(m => m.ListeMedecinsComponent)
    },
    {
        path: 'medecins/:id',
        loadComponent: () => import('./pages/detail-medecin/detail-medecin.component').then(m => m.DetailMedecinComponent)
      },
    { path: '', redirectTo: '/medecins', pathMatch: 'full' }, 
    { path: '**', component: PageNotFoundComponent }
  ];
