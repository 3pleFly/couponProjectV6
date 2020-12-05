import { Coupon } from './coupon.module';
export interface Company {
  id: number;
  name: string;
  email: string;
  password: string;
  coupons: Coupon[];
}
