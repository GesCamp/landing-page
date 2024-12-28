import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environments } from '../environments';
import { ApiTag } from '../environments/api-tag/api-tag.enum';
import { GetPrincipalCarouselInputDto, ImageDetailsDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class PrincipalCarouselService {
  constructor(private htts: HttpClient) {}

  getPrincipalBanner(id: string): Observable<ImageDetailsDto[]> {
    return this.htts
      .get<GetPrincipalCarouselInputDto[]>(
        `${environments.baseBomberosMalalhueUrl}${ApiTag.BANNER}-${id}`
      )
      .pipe(
        map((response) => {
          return this.extractImageUrls(response);
        })
      );
  }

  private extractImageUrls(
    response: GetPrincipalCarouselInputDto[]
  ): ImageDetailsDto[] {
    const imageUrls: ImageDetailsDto[] = [];
    response.forEach((item) => {
      const renderedContent = item.content?.rendered;
      if (renderedContent) {
        const details = this.extractImageSrcAndAlt(renderedContent);
        imageUrls.push(...details);
      }
    });

    return imageUrls;
  }

  private extractImageSrcAndAlt(renderedContent: string): any[] {
    const regex = /<img [^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g;
    const details: ImageDetailsDto[] = [];
    let match;
    let idCounter = 1;

    while ((match = regex.exec(renderedContent)) !== null) {
      const src = match[1];
      const alt = match[2];

      const linkMatch = /<a [^>]*href="([^"]*)"/g.exec(renderedContent);
      const link = linkMatch ? linkMatch[1] : null;

      details.push({
        id: idCounter++,
        src,
        alt,
        link,
      });
    }

    return details;
  }
}
