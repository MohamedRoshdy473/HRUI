import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { IUser } from 'src/app/Data_Types/iuser'
import { Router } from '@angular/router';
import {ForgotPassword} from 'src/app/Data_Types/ForgotPassword';
import {ResetPasswordDTO} from 'src/app/Data_Types/ResetPasswordDTO'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

   httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "bearer " + localStorage.getItem('token')
      })};
  user: IUser;
  email: string;
  password: string;
  constructor(private httpclient: HttpClient,private router : Router) {
    
  }
  public forgotPassword = (route: string, body: ForgotPassword) => {
    return this.httpclient.post(this.createCompleteRoute(route,environment.urlAddress), body);
  }
  public resetPassword = (route: string, body: ResetPasswordDTO) => {
    return this.httpclient.post(this.createCompleteRoute(route, environment.urlAddress), body);
  }
  login(user:IUser){
    //  this.email=user.email;
    //  this.password=user.password;
    //let Data={email,password}
    localStorage.setItem("OldPassword",user.password)
    console.log("old",localStorage.getItem("OldPassword"))
    var data = "email=" +user.email + "&password=" + user.password + "&grant_type=password";
    console.log(user)
    return this.httpclient.post(`${environment.ApiURL}/Authenticate/login`, user, this.httpOptions)
    ;
  }
  loggedIn()
  {
    return !! localStorage.getItem('token');
  }
  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  IsAdmin()
  {
    return localStorage.getItem('roles') == 'Admin';
  }
  IsUser()
  {
    return localStorage.getItem('roles') == 'User';
  }
  // changPassword(NewPassword:string)
  // {
  //   var data={
  //     userName:localStorage.getItem('userName'),
  //     password:"M@sTech146",
  //     Newpassword:NewPassword
  //   };
  //   return this.httpclient.post(`${environment.ApiURL}/Authenticate/changPassword`, data, this.httpOptions)
  // }
  changPassword(NewPassword: string) {
    var Oldpass=localStorage.getItem("OldPassword")

    var data = {
      userName: localStorage.getItem('userName'),
      
      // email:localStorage.getItem("email"),
      password: Oldpass,
      Newpassword: NewPassword
    };
    return this.httpclient.post(`${environment.ApiURL}/Authenticate/changPassword`, data, this.httpOptions)
  }
  checkInterceptor()
  {
    return this.httpclient.get(`${environment.ApiURL}/Authenticate/checkInterceptor`,this.httpOptions)
  }
}
