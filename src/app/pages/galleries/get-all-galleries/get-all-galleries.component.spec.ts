import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllGalleriesComponent } from './get-all-galleries.component';

describe('GetAllGalleriesComponent', () => {
  let component: GetAllGalleriesComponent;
  let fixture: ComponentFixture<GetAllGalleriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllGalleriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
