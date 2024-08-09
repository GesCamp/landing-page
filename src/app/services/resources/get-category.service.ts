import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../environments';
import { ApiTag } from '../environments/api-tag/api-tag.enum';

@Injectable({
  providedIn: 'root',
})
export class GetCategoryService {
  constructor(private http: HttpClient) {}

  getCategoriesByIds(ids: number[]): Observable<any[]> {
    const idsQuery = ids.join(',');
    return this.http.get<any[]>(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.CATEGORIES}?include=${idsQuery}`
    );
  }
}
