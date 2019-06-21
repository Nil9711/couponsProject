export class Coupon {
    public constructor(

        public couponId?:number,
        public amount?:number,
        public category?:string,
        public description?:string,
        public couponTitle?:string,
        public startDate?:string,
        public endDate?:string,
        public price?:number,
        public img?:string,
        public companyId?:number,

        
    ) {
    }

    

}

	
// coupon_id
// coupon_amount
// coupon_category
// coupon_description
// coupon_title
// coupon_start_date  Descending 1
// coupon_end_date
// coupon_img
// coupon_price
// company_company_id