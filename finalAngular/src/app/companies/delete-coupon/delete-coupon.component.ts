import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/shared/services/coupon.service';

@Component({
  selector: 'app-delete-coupon',
  templateUrl: './delete-coupon.component.html',
  styleUrls: ['./delete-coupon.component.css']
})
export class DeleteCouponComponent implements OnInit {

  public couponToDelete:number;
  public token:number;


  constructor(private couponService:CouponService) { }

  ngOnInit() {
    this.token = parseInt(sessionStorage.getItem("token"));
  }

  public deleteCoupon():void{
    // here delete only if the coupons company id equals to session storage company id
    // if (condition) {
      
    // }
    this.couponService.deleteCoupon(this.couponToDelete,this.token);
  }

}
