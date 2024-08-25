import { TestBed } from '@angular/core/testing';

import { PrincipalCarouselService } from './principal-carousel.service';

describe('PrincipalCarouselService', () => {
  let service: PrincipalCarouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrincipalCarouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
