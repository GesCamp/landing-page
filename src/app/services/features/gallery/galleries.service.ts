import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments';
import { ApiTag } from '../../environments/api-tag/api-tag.enum';
import { GetAllGalleriesDto, GetGalleryByIdDto } from './dtos';

@Injectable({
  providedIn: 'root',
})
export class GalleriesService {
  constructor(private http: HttpClient) {}

  // Obtener todas las galerías
  getAllGalleries(
    page: number = 1,
    perPage: number = 9
  ): Observable<GetAllGalleriesDto> {
    return this.http.get<GetAllGalleriesDto>(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.GALLERIES}?page=${page}&per_page=${perPage}`
    );
  }

  // Obtener una galería por ID
  getGalleryById(
    id: number,
    page: number = 1,
    perPage: number = 30
  ): Observable<any> {
    return this.http.get<any>(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.GALLERY}/${id}`,
      {
        params: {
          page: page,
          per_page: perPage,
        },
      }
    );
  }

  // Obtener imágenes de una galería por ID
  getImagesByGalleryId(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.GALLERIES}/${id}/images`
    );
  }

  // Obtener una galería por nombre
  // getGalleryByName(name: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/name/${name}`);
  // }

  // Obtener una galería por su slug
  getGalleryBySlug(
    slug: string,
    page: number = 1,
    perPage: number = 9
  ): Observable<GetGalleryByIdDto> {
    return this.http.get<GetGalleryByIdDto>(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.GALLERIES}/slug/${slug}`,
      {
        params: {
          page: page.toString(),
          per_page: perPage.toString(),
        },
      }
    );
  }
}
