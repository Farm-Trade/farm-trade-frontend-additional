import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceUpdateHistoryComponent } from './price-update-history.component';

describe('PriceUpdateHisoryComponent', () => {
  let component: PriceUpdateHistoryComponent;
  let fixture: ComponentFixture<PriceUpdateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceUpdateHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceUpdateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
