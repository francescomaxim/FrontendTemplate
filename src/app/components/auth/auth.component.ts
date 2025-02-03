import { Component, inject, signal } from '@angular/core';
import { AuthResponseData, AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  //login = true/ signup=false
  authMode = signal<true | false>(true);

  private authService = inject(AuthService);
  private router = inject(Router);

  switchAuthMode() {
    this.authMode.set(!this.authMode());
  }

  onSubmit(form: NgForm) {
    console.log('hello');

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.authMode()) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        // this.isLoading = false;
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        // this.error = errorMessage;
        // this.isLoading = false;
      }
    );

    form.reset();
  }
}
