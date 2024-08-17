import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGalleryComponent } from './get-gallery.component';

describe('GetGalleryComponent', () => {
  let component: GetGalleryComponent;
  let fixture: ComponentFixture<GetGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
