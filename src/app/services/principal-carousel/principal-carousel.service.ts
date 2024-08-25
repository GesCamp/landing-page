import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments';
import { ApiTag } from '../environments/api-tag/api-tag.enum';

@Injectable({
  providedIn: 'root',
})
export class PrincipalCarouselService {
  constructor(private htts: HttpClient) {}

  async getPrincipalBanner(id: string): Promise<Observable<any>> {
    return this.htts.get(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.BANNER}-${id}`
    );
  }
}
