import { Coupon } from './Coupon';
import { Customer } from './Customer';

export class Purchase {
    public constructor(
        public purchaseId?:number,
        public coupon?:Coupon,
        public customer?:Customer,
        public purchaseAmount?:number
    ) {
    }
}