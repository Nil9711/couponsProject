import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Coupon } from '../models/Coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public couponsArray: Coupon[];
  public coupon: Coupon;

  constructor(private http: HttpClient, private router: Router) {
    this.coupon = new Coupon();
  }

  public getUserCoupons(customerId: number,token:number): void {

    let observable = this.http.get<Coupon[]>("http://localhost:8080/coupons/ByCustomerId?customerId="+customerId+"&token="+token);

    observable.subscribe(couponsRes => {

      this.couponsArray = couponsRes;

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }
  public getAllCoupons(token:number): void {

    let observable = this.http.get<Coupon[]>("http://localhost:8080/coupons?token="+token);

    observable.subscribe(couponsRes => {

      this.couponsArray = couponsRes;

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }

  public getOneCoupon(token:number,couponId:number): void {

    let observable = this.http.get<Coupon>(`http://localhost:8080/coupons/${couponId}?token=${token}`);

    observable.subscribe(couponsRes => {

    this.coupon = couponsRes;

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }

  public addCoupon(coupon: Coupon, token: number): void {

    let observable = this.http.post<Coupon>(`http://localhost:8080/coupons?token=${token}`, coupon);

    observable.subscribe(res => {
      alert("Coupon Added");
    }, err => {
      alert("Status: " + err.status + ", Message: " + err.message);
    });


  }
  public updateCoupon(coupon: Coupon, token: number): void {

    let observable = this.http.put<Coupon>(`http://localhost:8080/coupons?token=${token}`, coupon);

    observable.subscribe(res => {
      alert("Coupon updated");
    }, err => {
      alert("Status: " + err.status + ", Message: " + err.message);
    });


  }
  public deleteCoupon(couponId: number, token: number): void {

    let observable = this.http.delete<Coupon>(`http://localhost:8080/coupons/${couponId}?token=${token}`);

    observable.subscribe(res => {
      alert("Coupon deleted");
    }, err => {
      alert("Status: " + err.status + ", Message: " + err.message);
    });


  }

}
