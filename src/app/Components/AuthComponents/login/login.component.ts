import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service'
import { IUser } from 'src/app/Data_Types/iuser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser;
  roles: any;
  email: string;
  password: string;
  constructor(private authService: AuthService, private router: Router,private messageService: MessageService) {
    this.user = { email: '', username: '', password: '' }
  }

  ngOnInit(): void {
  }


  onSubmit(event) {
   // console.log(this.user)
    this.authService.login(this.user).subscribe(
      data => {
        //console.log(data);
        //console.log(data['userName']);
        localStorage.setItem("token", data['token']);
        localStorage.setItem("roles", data['roles']);
        localStorage.setItem("userName", data['userName']);
        localStorage.setItem("id", data['id']);
        //console.log(data['token']);
        console.log("Login employee Id",data['id']);
        if (this.user.password == "M@sTech146")
         {
          this.router.navigate(['changPaswword']);
          // this.authService.changPassword(this.user,"P@ssw0rd").subscribe(
          //   data=>console.log("password changed")
          // )
        }
        else {
          this.router.navigate(['/mainPage']);
        }
       // console.log(localStorage.getItem('roles'));
      },
         error => {console.log(error),
         this.messageService.add({severity:'error', summary:'Login Error',
         detail:'UserName or Password Not Correct!'});
      }
    );
  }

}
