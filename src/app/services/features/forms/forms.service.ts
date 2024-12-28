import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { environments } from '../../environments';
import { ApiTag } from '../../environments/api-tag/api-tag.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  readonly #httpClient = inject(HttpClient);

  readonly #isLoading$ = new BehaviorSubject<boolean>(false);
  readonly #hasError$ = new Subject<boolean>();
  readonly #success$ = new Subject<void>();

  readonly #sendContactForm$ = new Subject<{
    formData: FormData;
    formId: number;
  }>();

  readonly isLoading$ = this.#isLoading$.asObservable();
  readonly hasError$ = this.#hasError$.asObservable();
  readonly success$ = this.#success$.asObservable();

  constructor() {
    this.#sendContactForm$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.#isLoading$.next(true)),
        tap(() => this.#hasError$.next(false)),
        switchMap(({ formId, formData }) =>
          this.#httpClient
            .post(
              `${environments.baseBomberosMalalhueUrlContactForms}${ApiTag.CONTACT_FORMS}/${formId}/feedback`,
              formData
            )
            .pipe(
              catchError(() => {
                this.#isLoading$.next(false), this.#hasError$.next(true);
                return EMPTY;
              }),
              tap(() => this.#success$.next())
            )
        ),
        tap(() => this.#isLoading$.next(false))
      )
      .subscribe();
  }

  submitForm(formId: number, formData: FormData) {
    this.#sendContactForm$.next({ formData, formId });
    return this.success$;
  }
}
