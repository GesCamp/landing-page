import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationErrorComponent } from './donation-error.component';

describe('DonationErrorComponent', () => {
  let component: DonationErrorComponent;
  let fixture: ComponentFixture<DonationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
