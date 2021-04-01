import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPassword } from 'src/app/Data_Types/ForgotPassword';
import { AuthService } from 'src/app/Services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;
  public _token: string;
  public _email: string;
  constructor(private _authService: AuthService,private _route: Router) { }
  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.controls[controlName].invalid && this.forgotPasswordForm.controls[controlName].touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.controls[controlName].hasError(errorName)
  }
  public forgotPassword = (forgotPasswordFormValue) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };
    var strUrl = `${environment.urlAddress4200}` + "Resetpassword?"
    const forgotPassDto: ForgotPassword = {
      email: forgotPass.email,
     // clientURI: 'http://localhost:4200/#/Resetpassword'
      clientURI:strUrl
      
    }
    console.log("clientURI",forgotPassDto.clientURI)
   // console.log("forgotPassDto",forgotPassDto)
    this._authService.forgotPassword('api/Authenticate/ForgotPassword', forgotPassDto)
    .subscribe(_ => {
      this.showSuccess = true;
      this.successMessage = 'The link has been sent, please check your email to reset your password.'
    },
    err => {
      this.showError = true;
      this.errorMessage = err;
    })
  }
}