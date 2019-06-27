import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenTypeAndId } from '../shared/models/TokenTypeAndId';
import { User } from '../shared/models/User';
import { Customer } from '../shared/models/Customer';
import { UserService } from '../shared/services/user.service';
import { CustomerService } from '../shared/services/customer.service';
import { Company } from '../shared/models/Company';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  ngOnInit() {
  }

  public customer:Customer;


  constructor(private http: HttpClient, private router: Router,private customerService:CustomerService) { 
      this.customer = new Customer();
      this.customer.user = new User();
      this.customer.user.userType = 'CUSTOMER';
      this.customer.user.company = null;
  }









}
