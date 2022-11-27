import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerRelatedLotsComponent } from './farmer-related-lots.component';

describe('FarmerRelatedLotsComponent', () => {
  let component: FarmerRelatedLotsComponent;
  let fixture: ComponentFixture<FarmerRelatedLotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmerRelatedLotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerRelatedLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
