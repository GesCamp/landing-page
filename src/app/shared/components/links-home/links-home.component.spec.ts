import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksHomeComponent } from './links-home.component';

describe('LinksHomeComponent', () => {
  let component: LinksHomeComponent;
  let fixture: ComponentFixture<LinksHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinksHomeComponent]
    });
    fixture = TestBed.createComponent(LinksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
