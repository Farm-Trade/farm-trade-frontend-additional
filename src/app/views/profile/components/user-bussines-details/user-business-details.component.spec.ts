import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBusinessDetailsComponent } from './user-business-details.component';

describe('UserBusinessDetailsComponent', () => {
  let component: UserBusinessDetailsComponent;
  let fixture: ComponentFixture<UserBusinessDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBusinessDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBusinessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
