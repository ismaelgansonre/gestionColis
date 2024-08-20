import { Routes } from '@angular/router';
import { AddColisComponent } from './add-colis/add-colis.component';
import { EditColisComponent } from './edit-colis/edit-colis.component';
import { ListColisComponent } from './list-colis/list-colis.component';
import { MenuComponent } from './menu/menu.component';

export const AppRoutes: Routes = [
  { path: 'add-colis', component: AddColisComponent },
  { path: 'edit-colis', component: EditColisComponent },
  { path: 'list-colis', component: ListColisComponent },
  { path: 'edit-colis/:id', component: EditColisComponent }, // Définissez la route pour l'édition
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
