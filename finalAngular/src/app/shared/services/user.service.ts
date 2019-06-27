import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenTypeAndId } from '../models/TokenTypeAndId';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedInUserDetails: User;
  public usersArray:User[];
  public isUserTypeCompany:boolean;
  public isUserTypeAdmin:boolean;
  public isUserTypeCustomer:boolean;

public checkUserType():void{
  
  if (sessionStorage.getItem("type") === 'COMPANY') {
    this.isUserTypeCompany = true;
  }
  
  if (sessionStorage.getItem("type") === 'ADMINISTRATOR') {
    this.isUserTypeAdmin = true;
  }
  
  if (sessionStorage.getItem("type") === 'CUSTOMER') {
    this.isUserTypeCustomer = true;
  }

  
  
}

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInUserDetails = new User();

  }


  public login(user: User): void {
    let observable = this.http.post<TokenTypeAndId>("http://localhost:8080/users/login", user);
    observable.subscribe(tokenTypeAndId => {

      if (tokenTypeAndId.type === 'COMPANY') {
        this.router.navigate(["/companies"]);
      }
      if (tokenTypeAndId.type === 'CUSTOMER') {
        this.router.navigate(["/customers"]);
      }
      if (tokenTypeAndId.type === 'ADMINISTRATOR') {
        this.router.navigate(["/administrator"]);
      }

      if (tokenTypeAndId.type != null) {

        sessionStorage.setItem("token", tokenTypeAndId.token + "");
        sessionStorage.setItem("type", tokenTypeAndId.type);
        sessionStorage.setItem("userId", tokenTypeAndId.userId + "");
        sessionStorage.setItem("companyId", tokenTypeAndId.companyId + "");

      } else {
        alert("Bad password!");
      }


    }, err => {
      alert("Error Status: " + err.status + ", Message: " + err.message);
    });

  }

  public addUser(user: User, token: number): void {

    let observable = this.http.post<User>(`http://localhost:8080/users?token=${token}`, user);

    observable.subscribe(res => {
      alert("User added");
    }, err => {
      alert("Status: " + err.status + ", Message: " + err.message);
    });


  }
  public adminAddUser(user: User, token: number): void {

    let observable = this.http.post<User>(`http://localhost:8080/users?token=${token}`, user);

    observable.subscribe(res => {
      alert("Admin added user");
    }, err => {
      alert("Status: " + err.status + ", Message: " + err.message);
    });


  }


  public updateUser(user: User, token: number) {

    user.userId = parseInt(sessionStorage.getItem("userId"));

    let observable = this.http.put<User>(`http://localhost:8080/users?token=${token}`, user);
    observable.subscribe(res => {

      alert("User updated");

    }, err => {
      alert("Update failed, Error Status: " + err.status + ", Message: " + err.message);
    });
  }

  public getAllUsers(token: number) {

    let observable = this.http.get<User[]>(`http://localhost:8080/users?token=${token}`);
    observable.subscribe(usersRes => {

     this.usersArray = usersRes;

    }, err => {
      alert("Update failed, Error Status: " + err.status + ", Message: " + err.message);
    });
  }



  public logOut(): void {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("type", "");
    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("companyId", "");
    alert("Logged out");
    this.router.navigate(["/home"]);

  }
  public goToLogin(): void {
    this.router.navigate(["/users/login"]);
  }
  public goToRegister(): void {
    this.router.navigate(["/customers/register"]);
  }
  public goToCustomers(): void {
    this.router.navigate(["/customers"]);
  }
  public goToHome(): void {
    this.router.navigate(["/home"]);
  }
  public goToEditInfo(): void {
    this.router.navigate(["/customers/editInfo"]);
  }
  public goToCoupons(): void {
    this.router.navigate(["/coupons"]);
  }
  public goToPurchases(): void {
    this.router.navigate(["/purchases"]);
  }
  public goToAdministrator(): void {
    this.router.navigate(["/administrator"]);
  }
  public goToCompanies(): void {
    this.router.navigate(["/companies"]);
  }
  public goToAddCoupon(): void {
    this.router.navigate(["/companies/addCoupon"]);
  }
  public goToUpdateCoupon(): void {
    this.router.navigate(["/companies/updateCoupon"]);
  }
  public goToDeleteCoupon(): void {
    this.router.navigate(["/companies/deleteCoupon"]);
  }
  public goToAddCompany(): void {
    this.router.navigate(["/administrator/addCompany"]);
  }
  public goToAddUser(): void {
    this.router.navigate(["/administrator/addUser"]);
  }
}
