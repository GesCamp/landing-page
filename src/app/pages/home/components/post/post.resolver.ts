import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GetPostService } from '../../../../services/post/get-post';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<any> {
  constructor(private wordpressService: GetPostService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug-noticia');
    if (slug) {
      return this.wordpressService.getPostBySlug(slug);
    } else {
      return null;
    }
  }
}
