import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { IUser } from "../Models/IUser.model";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpService, private router: Router, private message: NzMessageService) { }

  loginUser(user: IUser) {
    this.http.loginUser(user).subscribe(data => {
      localStorage.setItem("token", data["token"]);
      this.router.navigate(['/home']);
    }, error => this.message.error("incorrect username or password"))
  };


  checkToken(): boolean {
    if (localStorage.getItem("token"))
      return true;
    else
      return false;
  }

}
