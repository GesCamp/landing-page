import { TestBed } from '@angular/core/testing';
import { GetAllPostsService } from './get-all-posts.service';

describe('GetAllPostsServiceService', () => {
  let service: GetAllPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
