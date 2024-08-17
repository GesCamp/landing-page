import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GalleriesService } from '../../../services';

@Injectable({ providedIn: 'root' })
export class GetGalleryResolver implements Resolve<any> {
  constructor(private galleriesService: GalleriesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug-noticia');
    if (slug) {
      return this.galleriesService.getGalleryBySlug(slug);
    } else {
      return null;
    }
  }
}
