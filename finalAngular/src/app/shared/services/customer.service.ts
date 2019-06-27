import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http:HttpClient, private router: Router) {
   }


   public register(customer: Customer): void {

    let observable = this.http.post<User>("http://localhost:8080/customers", customer);

    observable.subscribe(res => {

      this.router.navigate(["/users/login"]);

    }, err => {
      alert("Register failed, Status: " + err.status + ", Message: " + err.message);
    });


  }

  public updateCustomer(customer:Customer,token:number):void{

    customer.customerId = parseInt(sessionStorage.getItem("userId"));

    let observable = this.http.put<Customer>(`http://localhost:8080/customers?token=${token}`, customer);
    observable.subscribe(res => {

      alert("Customer Updated");

    }, err => {
      alert("Update failed, Error Status: " + err.status + ", Message: " + err.message);
    });
  }

  public getOneCustomer(customerId:number,token: number):Customer {

    let observable = this.http.get<Customer>(`http://localhost:8080/customers/${customerId}?token=${token}`);
    observable.subscribe(customerResult => {
    
    let customerToReturn:Customer = new Customer();

    customerToReturn = customerResult;

    return customerResult;

    }, err => {
      alert("Update failed, Error Status: " + err.status + ", Message: " + err.message);
    });
    return null;
  }
}
