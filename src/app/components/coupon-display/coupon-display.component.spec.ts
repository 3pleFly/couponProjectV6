import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDisplayComponent } from './coupon-display.component';

describe('CouponDisplayComponent', () => {
  let component: CouponDisplayComponent;
  let fixture: ComponentFixture<CouponDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
