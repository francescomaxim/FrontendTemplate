import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
