import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRequestReviewComponent } from './order-request-review.component';

describe('OrderRequestReviewComponent', () => {
  let component: OrderRequestReviewComponent;
  let fixture: ComponentFixture<OrderRequestReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRequestReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
