import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/shared/models/Coupon';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { TokenTypeAndId } from 'src/app/shared/models/TokenTypeAndId';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private couponService: CouponService) { }

  public coupon: Coupon;
  public tokenTypeAndId: TokenTypeAndId;
  public token: number;
  public category: string;



  ngOnInit() {
    this.coupon = new Coupon();
    this.tokenTypeAndId = new TokenTypeAndId();

    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem('companyId'));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem('userId'));
    this.tokenTypeAndId.type = sessionStorage.getItem('type');
    this.token = parseInt(sessionStorage.getItem('token'));
  }

  public updateCoupon(): void {
    this.coupon.companyId = this.tokenTypeAndId.companyId;
    this.couponService.updateCoupon(this.coupon, this.token);
  }


}
