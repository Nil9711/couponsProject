import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/User';
import { TokenTypeAndId } from '../shared/models/TokenTypeAndId';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  public tokenTypeAndId: TokenTypeAndId;
  public isAdministrator: boolean;
  public token: number;
  public usersToShow: User[];
  public isAdminViewingUsers: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.tokenTypeAndId = new TokenTypeAndId();
    this.tokenTypeAndId.companyId = parseInt(sessionStorage.getItem("companyId"));
    this.tokenTypeAndId.userId = parseInt(sessionStorage.getItem("userId"));
    this.tokenTypeAndId.type = sessionStorage.getItem("type");
    this.token = parseInt(sessionStorage.getItem("token"));

    if (this.tokenTypeAndId.type === 'ADMINISTRATOR' && this.token != 0) {
      this.isAdministrator = true;
    }
  }

  public getAllUsers(): void {

    this.usersToShow = null;

    this.isAdminViewingUsers = true;

    this.userService.getAllUsers(this.token);

    this.usersToShow = this.userService.usersArray;



  }



}
