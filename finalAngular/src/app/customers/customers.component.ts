import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { CustomerService } from '../shared/services/customer.service';
import { Customer } from '../shared/models/Customer';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public isUserLoggedIn: boolean;
  public token: number;
  public customer: Customer;

  constructor(private userService: UserService, private customerService: CustomerService) {
  }

  public isLoggedIn(): boolean {

    if (parseInt(sessionStorage.getItem("userId")) >= 0) {
      return true;
    }
    return false;
  }

  public getCustomerName(): void {
    this.customer = this.customerService.getOneCustomer(parseInt(sessionStorage.getItem("userId")), this.token);
  }


  ngOnInit() {
    this.customer = new Customer();
    this.customer.user = new User();
    this.token = parseInt(sessionStorage.getItem("token"));
    this.isUserLoggedIn = false;
    this.getCustomerName();
    this.isUserLoggedIn = this.isLoggedIn();
    

  }

  




}
