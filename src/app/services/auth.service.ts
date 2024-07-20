// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, tap } from 'rxjs';
import { environments } from './environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  authenticate(): Observable<any> {
    const body = { username: 'admin', password: 'adminBomberos2024' };
    return this.http.post<any>(environments.authUrl, body).pipe(
      tap((response) => {
        this.token = response.token;
        if (this.token) {
          localStorage.setItem('authToken', this.token);
        } else {
          localStorage.removeItem('authToken');
        }
      }),
      catchError(this.handleError<any>('authenticate', null))
    );
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
