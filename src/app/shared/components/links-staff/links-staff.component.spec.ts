import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksStaffComponent } from './links-staff.component';

describe('LinksStaffComponent', () => {
  let component: LinksStaffComponent;
  let fixture: ComponentFixture<LinksStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksStaffComponent]
    });
    fixture = TestBed.createComponent(LinksStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
