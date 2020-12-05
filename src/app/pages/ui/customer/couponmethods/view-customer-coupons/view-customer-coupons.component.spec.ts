import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerCouponsComponent } from './view-customer-coupons.component';

describe('ViewCustomerCouponsComponent', () => {
  let component: ViewCustomerCouponsComponent;
  let fixture: ComponentFixture<ViewCustomerCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
