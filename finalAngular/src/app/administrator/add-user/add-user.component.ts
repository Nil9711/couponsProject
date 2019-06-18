import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { Company } from 'src/app/shared/models/Company';
import { User } from 'src/app/shared/models/User';
import { TokenTypeAndId } from 'src/app/shared/models/TokenTypeAndId';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public user: User;
  public tokenTypeAndId: TokenTypeAndId;
  public token: number;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
    this.user = new User();
    this.tokenTypeAndId = new TokenTypeAndId();

    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem("companyId"));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem("userId"));
    this.tokenTypeAndId.type = sessionStorage.getItem("type");
    this.token = parseInt(sessionStorage.getItem("token"));

    this.user.userType = "COMPANY";
  }

  public addUser(): void {
    this.userService.adminAddUser(this.user,this.token);
  }
}
