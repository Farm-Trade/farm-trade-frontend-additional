import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnRatedLotsComponent } from './own-rated-lots.component';

describe('OwnRatedLotsComponent', () => {
  let component: OwnRatedLotsComponent;
  let fixture: ComponentFixture<OwnRatedLotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnRatedLotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnRatedLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
