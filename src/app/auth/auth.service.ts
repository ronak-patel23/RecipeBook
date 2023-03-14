import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  token: string = null;
  private tokenExpirationTime: any;
  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadUser.token) {
      const tokenExpirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(tokenExpirationTime);
      this.user.next(loadUser);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logOut();
    }, expirationTime);
  }

  Login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKEY,{
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKEY,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          // this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        })
      );
  }

  private handleError(errRes: HttpErrorResponse) {
    let errorMsg = 'An unknown Error !';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already !';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'This email does not exist !';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'This password is not correct !';
        break;
    }
    return throwError(errorMsg);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expiratrionDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expiratrionDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
