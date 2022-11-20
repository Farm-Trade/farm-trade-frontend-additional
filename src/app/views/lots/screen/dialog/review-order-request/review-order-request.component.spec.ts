import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderRequestComponent } from './review-order-request.component';

describe('ReviewOrderRequestComponent', () => {
  let component: ReviewOrderRequestComponent;
  let fixture: ComponentFixture<ReviewOrderRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewOrderRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
