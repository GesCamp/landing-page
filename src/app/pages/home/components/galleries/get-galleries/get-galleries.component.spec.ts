import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetGalleriesComponent } from './get-galleries.component';

describe('GetAllGalleriesComponent', () => {
  let component: GetGalleriesComponent;
  let fixture: ComponentFixture<GetGalleriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetGalleriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetGalleriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
