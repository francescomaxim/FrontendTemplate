import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroComponent,
  },
  {
    path: 'home',
    component: HeroComponent,
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
