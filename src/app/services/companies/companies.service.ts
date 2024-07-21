import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environments } from '../environments';
import { ApiTag } from '../environments/api-tag/api-tag.enum';
import { CompaniesDto } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompanieService {
  constructor(private http: HttpClient) {}

  getCompanyDetails(id: string): Observable<CompaniesDto[]> {
    return this.http.get<CompaniesDto[]>(
      `${environments.baseBomberosMalalhueUrl}${ApiTag.COMPANIES}${id}`
    );
  }
}
