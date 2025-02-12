import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { AuthMenuService } from './auth-menu/auth-menu.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authMenuService = inject(AuthMenuService);
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvdIqpabyl7Nl14se07awrvOGATE5AfFg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.sendEmailVerification(resData.idToken);
          this.router.navigate(['/email-verification']);
        })
      );
  }

  sendEmailVerification(idToken: string) {
    return this.http
      .post<{ email: string }>(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCvdIqpabyl7Nl14se07awrvOGATE5AfFg',
        {
          requestType: 'VERIFY_EMAIL',
          idToken: idToken,
        }
      )
      .subscribe({
        next: (res) => console.log(`Verification email sent to ${res.email}`),
        error: (err) => console.error('Error sending verification email', err),
      });
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvdIqpabyl7Nl14se07awrvOGATE5AfFg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.checkEmailVerification(resData.idToken);
        })
      );
  }

  checkEmailVerification(idToken: string) {
    this.http
      .post<{
        users: {
          localId: string;
          email: string;
          emailVerified: boolean;
        }[];
      }>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCvdIqpabyl7Nl14se07awrvOGATE5AfFg',
        {
          idToken: idToken,
        }
      )
      .subscribe({
        next: (resData) => {
          if (resData.users[0]?.emailVerified) {
            this.handleAuthentication(
              resData.users[0].email,
              resData.users[0].localId,
              idToken,
              3600
            );
          } else {
            console.error('Please verify your email before logging in.');
          }
        },
        error: (err) => console.error('Error checking email verification', err),
      });
  }

  confirmEmailVerification(oobCode: string) {
    return this.http
      .post<{ email: string }>(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCvdIqpabyl7Nl14se07awrvOGATE5AfFg',
        {
          oobCode: oobCode,
        }
      )
      .subscribe({
        next: (res) => console.log(`Email ${res.email} verified successfully!`),
        error: (err) => console.error('Error verifying email', err),
      });
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    this.authMenuService.mode.set(1);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
