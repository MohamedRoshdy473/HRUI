import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { EmployeeService } from 'src/app/Services/employee.service'
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  Newpassword:string;
  registerForm: FormGroup;
  model: any = {};
  empId: number;
  employeeEmail: any
  clientEmail: any
  confirmedPassword: any
  passwordPattern: string
  submitted = false;
  clientId: number;
  role: string;
  constructor(private AuthService:AuthService,private router: Router,
    public formBuilder: FormBuilder,
    private empService: EmployeeService,) { }

    ngOnInit(): void {
      this.role = localStorage.getItem("roles")
      // Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)
      this.passwordPattern = "^[a-z0-9_-]{8,15}$";
      this.employeeEmail = ''
      if (this.role != "Client") {
        this.empId = Number(localStorage.getItem('id'))
        this.empService.GetEmployee(this.empId).subscribe(w => {
          console.log(w)
          this.employeeEmail = w.email
         console.log("email",this.employeeEmail)
  
        })
      }
      this.registerForm = this.formBuilder.group(
        {
          password: ["", [Validators.required, Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
  
          confirmPassword: ["", Validators.required]
        },
        {
          validator: MustMatch("password", "confirmPassword")
        }
      );
    }
    get f() { return this.registerForm.controls; }
  // onSubmit(event)
  // {
  //   this.AuthService.changPassword(this.Newpassword).subscribe(
  //     data=>this.router.navigate(['/']),
  //     error=>console.log(error)
  //   )
  // }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
      return;
    }
    else {
      this.AuthService.changPassword(this.Newpassword).subscribe(

        data => this.router.navigate(['/login']),

        error => console.log(error)
      )
    }

    alert("PASSWORD UPDATED SUCCESSFULLY!! :-)\n\n");
  }
  onReset() {
    // this.submitted = false;
    this.router.navigate(['/Profile'])
    // this.registerForm.reset();
  }
}
