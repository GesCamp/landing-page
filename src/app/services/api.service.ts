import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environments } from './environments';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  private token: string | null = null;
  private username = 'admin';
  private password = 'adminBomberos2024';

  constructor(private http: HttpClient) {
    this.authenticate(this.username, this.password).subscribe(
      (response) => {
        console.log('Authenticated successfully');
      },
      (error) => {
        console.error('Authentication failed', error);
      }
    );
  }

  private authenticate(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(environments.authUrl, body).pipe(
      tap((response) => (this.token = response.token)),
      catchError(this.handleError<any>('authenticate', null))
    );
  }

  private getHeaders(): HttpHeaders {
    console.log(this.token);
    if (this.token) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
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
        {
          headers,
        }
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
            console.log(item.featured_media);
            const mediaId = item.featured_media;
            return this.http
              .get<any>(
                environments.baseBomberosMalalhueUrl + 'media/' + mediaId
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
      {
        headers,
      }
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
  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // Log para debugging
      return of(result as T);
    };
  }
}
