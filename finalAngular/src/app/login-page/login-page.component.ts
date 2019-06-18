import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenTypeAndId } from '../shared/models/TokenTypeAndId';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  ngOnInit() {
  }

  public user:User;
  public tokenTypeAndId:TokenTypeAndId;

  constructor(private http: HttpClient, private router: Router,private userService:UserService) { 
      this.user = new User();
      this.tokenTypeAndId = new TokenTypeAndId();
  }

  public login(user:User):void{
    this.userService.login(user);
  }




}
