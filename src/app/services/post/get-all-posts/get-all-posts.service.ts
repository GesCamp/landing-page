import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class GetAllPostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${environments.baseBomberosMalalhueUrl}posts?_embed&per_page=9`
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching posts:', error);
          return throwError(() => new Error('Error fetching posts'));
        })
      );
  }
}
