import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Company } from 'src/app/shared/models/Company';
import { CompanyService } from 'src/app/shared/services/company.service';
import { TokenTypeAndId } from 'src/app/shared/models/TokenTypeAndId';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public company:Company;
  public tokenTypeAndId:TokenTypeAndId;
  public token:number;

  constructor(private http: HttpClient, private router: Router,private companyService:CompanyService) {} 

  ngOnInit() {
    this.company = new Company();
    this.tokenTypeAndId = new TokenTypeAndId();
    
    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem("companyId"));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem("userId"));
    this.tokenTypeAndId.type = sessionStorage.getItem("type");
    this.token = parseInt(sessionStorage.getItem("token"));
  }

  public addCompany():void{
    this.companyService.addCompany(this.company,this.token);
  }

}
