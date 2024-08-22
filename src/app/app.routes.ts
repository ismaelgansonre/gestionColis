import { Routes } from '@angular/router';
import { AddColisComponent } from './add-colis/add-colis.component';
import { EditColisComponent } from './edit-colis/edit-colis.component';
import { ListColisComponent } from './list-colis/list-colis.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-colis', component: AddColisComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-colis',
    component: EditColisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list-colis',
    component: ListColisComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-colis/:id',
    component: EditColisComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
