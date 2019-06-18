import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Coupon } from 'src/app/shared/models/Coupon';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { TokenTypeAndId } from 'src/app/shared/models/TokenTypeAndId';
import { Category } from 'src/app/shared/models/Category';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {

  public coupon: Coupon;
  public tokenTypeAndId: TokenTypeAndId;
  public token:number;
  public category:string;

  categories: Category[] = [
    { value: 'FOOD', viewValue: 'FOODS' },
    { value: 'ELECTRONICS', viewValue: 'ELECTRONICS' },
    { value: 'COFFEE_SHOP', viewValue: 'COFFEE_SHOP' },
    { value: 'RESTAURANTS', viewValue: 'RESTAURANTS' },
    { value: 'VACATION', viewValue: 'VACATION' },
    { value: 'CONCERTS', viewValue: 'CONCERTS' },
    { value: 'FOOTBALL_GAME', viewValue: 'FOOTBALL_GAME' },
    { value: 'MOVIES', viewValue: 'MOVIES' },
    { value: 'TRIPS', viewValue: 'TRIPS' },
    { value: 'KIDS_ATTRACTIONS', viewValue: 'KIDS_ATTRACTIONS' },
    { value: 'FURNITURE', viewValue: 'FURNITURE' },
    { value: 'OPTICS', viewValue: 'OPTICS' },
    { value: 'HAIR_SALONS', viewValue: 'HAIR_SALONS' },
    { value: 'PUBLIC_TRANSPORTATION', viewValue: 'PUBLIC_TRANSPORTATION' },
    { value: 'COSMETIC_SURGERIES', viewValue: 'COSMETIC_SURGERIES' },
    { value: 'PET_STORE', viewValue: 'PET_STORE' },
  ];



  constructor(private http: HttpClient, private router: Router, private couponService: CouponService) { }

  ngOnInit() {
    this.coupon = new Coupon();
    this.tokenTypeAndId = new TokenTypeAndId();

    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem('companyId'));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem('userId'));
    this.tokenTypeAndId.type = sessionStorage.getItem('type');
    this.token = parseInt(sessionStorage.getItem('token'));
  }

  public addCoupon(): void {
    alert(this.category);
    this.coupon.companyId = this.tokenTypeAndId.companyId;
    this.couponService.addCoupon(this.coupon,this.token);
  }

}
