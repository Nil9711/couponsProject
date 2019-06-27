import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  public goToLogin():void{
    this.router.navigate(['users/login']);
  }
  public goToRegister():void{
    this.router.navigate(['customers/register']);
  }
  public goToCoupons():void{
    this.router.navigate(['coupons']);
  }
  public goToPurchases():void{
    this.router.navigate(['purchases']);
  }
  public goToCustomer():void{
    this.router.navigate(['customers']);
  }

}
