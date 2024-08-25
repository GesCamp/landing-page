import { TestBed } from '@angular/core/testing';

import { BannersAndPromotionsService } from './banners-and-promotions.service';

describe('BannersAndPromotionsService', () => {
  let service: BannersAndPromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannersAndPromotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
