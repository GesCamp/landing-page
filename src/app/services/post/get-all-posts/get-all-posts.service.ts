import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class GetAllPostsService {
  constructor(private http: HttpClient) {}

  getPosts(
    page: number,
    perPage: number
  ): Observable<{ posts: any[]; totalPages: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http
      .get<any[]>(
        `${environments.baseBomberosMalalhueUrl}posts?_embed`,
        { params, observe: 'response' } // Usamos `observe: 'response'` para obtener los encabezados
      )
      .pipe(
        map((response) => ({
          posts: response.body || [],
          totalPages: parseInt(
            response.headers.get('X-WP-TotalPages') || '0',
            10
          ),
        })),
        catchError((error) => {
          console.error('Error fetching posts:', error);
          return throwError(() => new Error('Error fetching posts'));
        })
      );
  }
}
