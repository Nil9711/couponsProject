import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/shared/models/Customer';
import { UserService } from 'src/app/shared/services/user.service';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { User } from 'src/app/shared/models/User';
import { Company } from 'src/app/shared/models/Company';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  public customer:Customer;
  public token:number;

  constructor(private userService:UserService, private customerService:CustomerService) { 
  }
  
  ngOnInit() {
    this.customer = new Customer();
    this.customer.user = new User();
    this.customer.user.userType = 'CUSTOMER';
    this.customer.customerId = parseInt(sessionStorage.getItem("userId"));
    this.customer.user.userId = parseInt(sessionStorage.getItem("userId"));
    this.token = parseInt(sessionStorage.getItem("token"));
  }

  public sendCustomerUpdate():void{
    this.customerService.updateCustomer(this.customer,this.token);
  }

  public sendUserUpdate():void{
    this.userService.updateUser(this.customer.user,this.token);
  }

}
