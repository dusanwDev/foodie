import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Customer } from '../models/Customer.model';
import { LogedInUser } from '../models/LogedInUser.model';
import { Restaurant } from '../models/Restaurant.model';
import { Utility } from '../models/Utility.model';
interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

type authType =
  | 'registerRestaurant'
  | 'registerUser'
  | 'loginUser'
  | 'loginRestaurant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<LogedInUser>(null);

  constructor(
    private afs: AngularFirestore,
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string, registerType: authType) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCyJA1fT5zaSdDJXn107YnTGLmQnWeW27E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrors),
        tap((data) =>
          this.handleAuthCustomer(
            data.email,
            +data.expiresIn,
            data.idToken,
            data.localId,
            data.refreshToken,
            registerType
          )
        )
      );
  }
  registerRestaurant(restaurantName: string, email: string, password: string) {
    console.log('REGISTER', restaurantName);
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyJA1fT5zaSdDJXn107YnTGLmQnWeW27E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => {
          this.handleAuthCustomer(
            data.email,
            +data.expiresIn,
            data.idToken,
            data.localId,
            data.refreshToken,
            'registerRestaurant',
            restaurantName
          );
        })
      );
  }
  registerUser(
    userFirstName: string,
    userLastName: string,
    email: string,
    password: string
  ) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCyJA1fT5zaSdDJXn107YnTGLmQnWeW27E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((data) => {
          this.handleAuthCustomer(
            data.email,
            +data.expiresIn,
            data.idToken,
            data.localId,
            data.refreshToken,
            'registerUser',
            userFirstName,
            userLastName
          );
        })
      );
  }

  handleAuthCustomer(
    email: string,
    expiresIn: number,
    idToken: string,
    localId: string,
    refreshToken: string,
    authType: authType,
    name?: string,
    lastName?: string
  ) {
    const expDate = new Date(new Date(new Date().getTime() + expiresIn * 1000));
    const user = new LogedInUser(
      localId,
      idToken,
      expDate,
      refreshToken,
      email
    );

    localStorage.setItem('user', JSON.stringify(user));
    console.log('LOGIN', name);
    switch (authType) {
      case 'registerRestaurant':
        this.afs.collection(Utility.firestoreName).doc(user.userId).set({
          restaurantName: name,
          restaurantId: user.userId,
        });
        this.router.navigate(['/restaurant-dashboard', user.userId]);
        break;
      case 'registerUser':
        this.afs
          .collection<Customer>(Utility.firestoreName)
          .doc(user.userId)
          .set({
            customerName: name,
            customerLastName: lastName,
            customerId: user.userId,
          });
        break;
      case 'loginRestaurant':
        this.router.navigate(['/restaurant-dashboard', user.userId]);
        break;
      case 'loginUser':
        break;
      default:
    }
  }
  handleErrors(err: HttpErrorResponse) {
    let message = 'Unknown Error occured';
    if (!err.error || !err.error.error) {
      return throwError(message);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'Email exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message = 'We detected some unusual activity';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'Email not found';
        break;
      case 'INVALID_PASSWORD':
        message = 'Password is invalid';
        break;
      default:
        message = 'An unknown error has occured';
        break;
    }

    return throwError(message);
  }
  logOut() {
    localStorage.removeItem('user');
  }
}
