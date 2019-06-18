import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { TokenTypeAndId } from '../shared/models/TokenTypeAndId';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  public isCompanyUser:boolean = false;
  public tokenTypeAndId:TokenTypeAndId;
  public token:number;
  constructor(private userService:UserService) {
    this.tokenTypeAndId = new TokenTypeAndId();
    this.tokenTypeAndId.type = sessionStorage.getItem("type");
    this.token = parseInt(sessionStorage.getItem("token"));
   }

  ngOnInit() {
    if (this.tokenTypeAndId.type === 'COMPANY' && this.token != 0) {
      this.isCompanyUser = true;
    }
  }

}
