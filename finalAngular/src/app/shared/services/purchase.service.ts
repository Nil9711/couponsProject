import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Purchase } from '../models/Purchase';
import { Coupon } from '../models/Coupon';
import { CouponService } from './coupon.service';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient, private router: Router,private couponService:CouponService) {
  }

  public purchasesArray: Purchase[];

  public getAllPurchases(token: number): void {

    let observable = this.http.get<Purchase[]>(`http://localhost:8080/purchases?token=${token}`);

    observable.subscribe(purchasesRes => {

      this.purchasesArray = purchasesRes;

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }
  public getAllPurchasesById(customerId: number, token: number): void {
    let observable = this.http.get<Purchase[]>(`http://localhost:8080/purchases/ByCustomerId?customerId=${customerId}&token=${token}`);

    observable.subscribe(purchasesRes => {

      this.purchasesArray = purchasesRes;

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }
  public getAllPurchasesByCustomerIdAndCouponID(customerId: number, couponId: number, token: number): void {

    let observable = this.http.get<Purchase[]>(`http://localhost:8080/purchases/ByCustomerIdAndCouponId?
    customerId=${customerId}&couponId=${couponId}&token=${token}`);

    observable.subscribe(purchasesRes => {

      this.purchasesArray = purchasesRes;

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }
  public addPurchase(couponId: number, purchaseAmount: number, token: number): void {

    let purchase: Purchase = new Purchase();
    purchase.coupon = new Coupon();
    purchase.customer = new Customer();

    purchase.coupon.couponId = couponId;
    purchase.purchaseAmount = purchaseAmount;
    purchase.customer.customerId = parseInt(sessionStorage.getItem("userId"));

    let observable = this.http.post<Purchase>(`http://localhost:8080/purchases?token=${token}`, purchase);

    observable.subscribe(purchasesRes => {

      alert("Purchase success");

    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }

}
