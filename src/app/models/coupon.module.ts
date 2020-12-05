export interface Coupon {
  id: number;
  categoryName: string;
  companyID: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}
