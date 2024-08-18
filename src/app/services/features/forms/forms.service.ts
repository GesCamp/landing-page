import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { environments } from '../../environments';
import { AuthService } from '../../auth.service';
import { ApiTag } from '../../environments/api-tag/api-tag.enum';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return of(headers); // Asegúrate de devolver el Observable<HttpHeaders> correcto
      })
    );
  }

  submitForm(formId: number, formData: FormData): Observable<any> {
    const url = `${environments.baseBomberosMalalhueUrlContactForms}${ApiTag.CONTACT_FORMS}/${formId}/feedback`;

    return this.getHeaders().pipe(
      switchMap((headers) => {
        // No es necesario establecer Content-Type aquí
        return this.http.post<any>(url, formData, { headers });
      }),
      catchError((error) => {
        console.error('Error en submitForm', error);
        return of(error); // Devuelve un observable de error
      })
    );
  }
}
