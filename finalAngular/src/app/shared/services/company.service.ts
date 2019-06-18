import { Injectable } from '@angular/core';
import { Company } from '../models/Company';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private http: HttpClient, private router: Router) {
  }

  public addCompany(company: Company,token:number): void {

    let observable = this.http.post<Company>(`http://localhost:8080/companies?token=${token}`, company);

    observable.subscribe(res => {
      alert("Company Added");
    }, err => {
      alert("Status: " + err.status + ", Message: " + err.message);
    });


  }

}
