import { Component, OnInit } from '@angular/core';
import { CouponService } from '../shared/services/coupon.service';
import { PurchaseService } from '../shared/services/purchase.service';
import { Router } from '@angular/router';
import { Purchase } from '../shared/models/Purchase';
import { Coupon } from '../shared/models/Coupon';
import { TokenTypeAndId } from '../shared/models/TokenTypeAndId';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  constructor(private couponService: CouponService, private purchasesService: PurchaseService, private router: Router) { }

  public purchasesArray: Purchase[];
  public purchasedCoupons: Coupon[];
  public tokenTypeAndId: TokenTypeAndId;
  public token: number;
  public isViewingPurchases: boolean = false;

  ngOnInit() {
    this.tokenTypeAndId = new TokenTypeAndId();
    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem("companyId"));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem("userId"));
    this.tokenTypeAndId.type = sessionStorage.getItem("type");
    this.token = parseInt(sessionStorage.getItem("token"));
    this.couponService.getUserCoupons(this.tokenTypeAndId.userId,this.token);
    this.purchasedCoupons = this.couponService.couponsArray;

  }

  public getPurchases(): void {
    this.purchasesService.getAllPurchasesById(this.tokenTypeAndId.userId,this.token);
    this.purchasesArray = this.purchasesService.purchasesArray;
    this.isViewingPurchases = true;
  }
}