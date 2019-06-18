export class Purchase {
    public constructor(
        public purchaseId?:number,
        public customerId?:number,
        public couponId?:number,
        public purchaseAmount?:number
    ) {
    }
}