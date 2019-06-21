import { Component, OnInit } from '@angular/core';
import { CouponService } from '../shared/services/coupon.service';
import { Coupon } from '../shared/models/Coupon';
import { PurchaseService } from '../shared/services/purchase.service';
import { Purchase } from '../shared/models/Purchase';
import { Router } from '@angular/router';
import { TokenTypeAndId } from '../shared/models/TokenTypeAndId';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  public tokenTypeAndId: TokenTypeAndId;
  public token: number;
  public couponsToDisplay: Coupon[];
  public purchaseAmount: number;
  public isThisCouponPurchased: boolean;
  public isCustomerBuying: boolean;
  public couponIdBuying: number;


  constructor(private couponService: CouponService, private purchasesService: PurchaseService, private router: Router) {
  }

  ngOnInit() {
    this.tokenTypeAndId = new TokenTypeAndId();
    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem("companyId"));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem("userId"));
    this.tokenTypeAndId.type = sessionStorage.getItem("type");
    this.token = parseInt(sessionStorage.getItem("token"));
    this.isCustomerBuying = false;

  }

  public getAllCoupons(): void {
    this.clear();
    this.couponService.getAllCoupons(this.token);
    this.couponsToDisplay = this.couponService.couponsArray;
  }

  public clear(): void {
    this.couponsToDisplay = null;
  }

  public buyThisCoupon(): void {

    this.purchasesService.addPurchase(this.couponIdBuying, this.purchaseAmount, this.token);

  }
  public customerBuying(couponId: number): void {
    this.isCustomerBuying = true;
    this.couponIdBuying = couponId;
  }

  public goToPurchases(): void {
    this.router.navigate(["/purchases"]);
  }

}