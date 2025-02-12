import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { AuthComponent } from './components/auth/auth.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { EmailVerificationComponent } from './components/auth/email-verification/email-verification.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'email-verification',
    component: EmailVerificationComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
