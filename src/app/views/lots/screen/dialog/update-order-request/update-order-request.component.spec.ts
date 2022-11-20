import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderRequestComponent } from './update-order-request.component';

describe('UpdateOrderRequestComponent', () => {
  let component: UpdateOrderRequestComponent;
  let fixture: ComponentFixture<UpdateOrderRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOrderRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
