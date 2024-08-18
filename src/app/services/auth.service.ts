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
    const body = { username: 'user', password: 'CbMalalhue_2024!' };
    return this.http.post<any>(environments.authUrl, body).pipe(
      tap((response) => {
        const token = response?.data?.token ?? null; // Asignar null si no existe el token
        if (token) {
          this.token = token;
          localStorage.setItem('authToken', this.token ?? ''); // Asegúrate de que `this.token` no sea `null`
        } else {
          console.warn('No se encontró un token en la respuesta');
          localStorage.removeItem('authToken');
        }
      }),
      catchError(this.handleError<any>('authenticate', null))
    );
  }

  async getToken(): Promise<string> {
    const token = this.token || localStorage.getItem('authToken');
    if (token) {
      return token;
    } else {
      throw new Error('Token no encontrado');
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
