import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { GetMediaResourceDto } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetMediaResourceService {
  constructor(private readonly http: HttpClient) {}

  getMediaResource(mediaUrl: string): Observable<GetMediaResourceDto> {
    return this.http.get<any>(mediaUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener la imagen destacada:', error);
        return throwError(error);
      })
    );
  }
}
