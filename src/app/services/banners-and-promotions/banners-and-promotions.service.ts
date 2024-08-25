import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../environments';
import { ApiTag } from '../environments/api-tag/api-tag.enum';

@Injectable({
  providedIn: 'root',
})
export class BannersAndPromotionsService {
  constructor(private http: HttpClient) {}

  async getBannersAndPromotions(id: number): Promise<any> {
    return await this.http.get(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.BANNERS_AND_PROMOTIONS}-${id}`
    );
  }
}
