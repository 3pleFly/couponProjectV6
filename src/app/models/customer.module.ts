import { Coupon } from './coupon.module';
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  coupons: Coupon[];
}
