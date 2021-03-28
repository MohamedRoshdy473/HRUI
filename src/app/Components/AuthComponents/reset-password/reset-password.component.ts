import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import {PasswordConfirmationValidatorService} from 'src/app/Customvalidators/password-confirmation-validator.service'
import { ActivatedRoute } from '@angular/router';
import { ResetPassword } from 'src/app/Data_Types/ResetPassword';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm: FormGroup;
  public showSuccess: boolean;
  public showError: boolean;
  public errorMessage: string;
  public _token: string;
  public _email: string;
  constructor(private _authService: AuthService, private _passConfValidator: PasswordConfirmationValidatorService, 
    private _route: ActivatedRoute) { }
 
    ngOnInit(): void {
      this.resetPasswordForm = new FormGroup({
        password: new FormControl('', [Validators.required]),
        confirm: new FormControl('')
      });
      this.resetPasswordForm.get('confirm').setValidators([Validators.required,
        this._passConfValidator.validateConfirmPassword(this.resetPasswordForm.get('password'))]);
      
        this._token = this._route.snapshot.queryParams['token'];
        this._email = this._route.snapshot.queryParams['email'];
        console.log("this._token",this._token) 
         console.log("this._token",this._token)
    }
  
    public validateControl = (controlName: string) => {
      return this.resetPasswordForm.controls[controlName].invalid && this.resetPasswordForm.controls[controlName].touched
    }
  
    public hasError = (controlName: string, errorName: string) => {
      return this.resetPasswordForm.controls[controlName].hasError(errorName)
    }
  
    public resetPassword = (resetPasswordFormValue) => {
      this.showError = this.showSuccess = false;
  
      const resetPass = { ... resetPasswordFormValue };
      const resetPassDto: ResetPassword = {
        password: resetPass.password,
        confirmPassword: resetPass.confirm,
        token: this._token,
        email: this._email
      }
      
      this._authService.resetPassword('api/Authenticate/ResetPassword', resetPassDto)
      .subscribe(_ => {
        this.showSuccess = true;
        console.log("token",resetPassDto)

      },
      error => {
        this.showError = true;
        this.errorMessage = error;
      })
    }
  
  }