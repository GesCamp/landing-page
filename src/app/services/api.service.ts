// src/app/services/wordpress.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environments } from './environments';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.authenticate().subscribe(
      (response) => {
        console.log('Authenticated successfully');
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + token,
      });
    } else {
      return new HttpHeaders();
    }
  }

  getPosts(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http
      .get<any[]>(
        `${environments.baseBomberosMalalhueUrl}posts?_embed&per_page=9`,
        { headers }
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching posts:', error);
          return throwError(() => new Error('Error fetching posts'));
        })
      );
  }

  getPost(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<any>(`${environments.baseBomberosMalalhueUrl}posts/` + id, {
        headers,
      })
      .pipe(
        switchMap((item) => {
          if (item.featured_media) {
            const mediaId = item.featured_media;
            return this.http
              .get<any>(
                `${environments.baseBomberosMalalhueUrl}media/${mediaId}`
              )
              .pipe(
                map((media) => ({
                  ...item,
                  featuredMedia: media,
                }))
              );
          } else {
            return of(item);
          }
        })
      );
  }

  getPage(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(
      `${environments.baseBomberosMalalhueUrl}pages/?slug=${id}`,
      { headers }
    );
  }

  getPostBySlug(slug: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .get<any>(`${environments.baseBomberosMalalhueUrl}posts?slug=${slug}`, {
        headers,
      })
      .pipe(
        switchMap((posts) => {
          if (posts.length > 0) {
            const post = posts[0];
            if (post.featured_media) {
              const mediaId = post.featured_media;
              return this.http
                .get<any>(
                  `${environments.baseBomberosMalalhueUrl}media/${mediaId}`
                )
                .pipe(
                  map((media) => ({
                    ...post,
                    featuredMedia: media,
                  }))
                );
            } else {
              return of(post);
            }
          } else {
            return of(null);
          }
        })
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log para debugging
      return of(result as T);
    };
  }
}
