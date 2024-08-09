import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class GetPostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(
      `${environments.baseBomberosMalalhueUrl}posts?_embed`
    );
  }

  getPostBySlug(slug: string): Observable<any> {
    return this.http
      .get<any>(`${environments.baseBomberosMalalhueUrl}posts?slug=${slug}`, {})
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
}
