import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environments } from '../../environments';
import { GetAllPostsDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class GetAllPostsService {
  constructor(private httpClient: HttpClient) {}

  getPosts(
    page: number,
    perPage: number
  ): Observable<{ posts: GetAllPostsDto[]; totalPages: number }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.httpClient
      .get<void>(`${environments.baseBomberosMalalhueUrl}posts?_embed`, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const posts = response.body || [];
          const totalPages = parseInt(
            response.headers.get('X-WP-TotalPages') || '0',
            10
          );

          const mappedPosts: GetAllPostsDto[] = posts.map((post: any) => {
            const terms =
              post._embedded?.['wp:term']?.[0]?.map((term: any) => term.name) ||
              [];

            const imageUrl =
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

            return {
              id: post.id,
              title: post.title.rendered,
              content: post.content.rendered,
              date: post.date,
              slug: post.slug,
              excerpt: post.excerpt.rendered,
              category: terms,
              imageUrl: imageUrl,
            };
          });

          return { posts: mappedPosts, totalPages };
        }),
        catchError((error) => {
          console.error('Error fetching posts:', error);
          return throwError(() => new Error('Error fetching posts'));
        })
      );
  }
}
