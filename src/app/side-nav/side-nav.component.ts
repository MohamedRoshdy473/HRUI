import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Directionality } from '@angular/cdk/bidi';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {


  IsAdmin: any;
  IsUser: any;
  show: boolean;
  direction = 'ltr';
  role:string
  getimage: string;
  empId: number;
  imgName: string;
  constructor(private empService:EmployeeService,private AuthService: AuthService, public translate: TranslateService, public dir: Directionality,private route: Router,
    ) {
    this.show = true;
    // console.log(dir.value);
    // this.direction = 'rtl';

    translate.addLangs(['English', 'العربية']);
    translate.setDefaultLang('English');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/English|العربية/) ? browserLang : 'English');
  }
  userName = localStorage.getItem("userName")
  ngOnInit(): void {
    // this.dir.change.subscribe((changes) => {
    //   console.log(changes)
    // });
    this.getimage = environment.getImageByName
     this.role=localStorage.getItem("roles");

     this.empId = Number(localStorage.getItem('id'))
     //console.log(localStorage.getItem('id')) 
     this.empService.GetEmployee(this.empId).subscribe(w => {
       console.log(w)
       this.imgName = w.photo
     })
  }
  goToProfile() {
    this.route.navigate(['/Profile']);

  }
  logout() {
    this.AuthService.logout();
  }
  isAdmin() {
    this.show == this.show;
    return this.AuthService.IsAdmin();
  }
  isUser() {
    this.show != this.show;
    return this.AuthService.IsUser();

  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

//   changeDir($event) {
//     //debugger;
//     //console.log($event.target.value);
//     // this.translate.use($event.target.value);
//     sessionStorage.setItem("lang", $event.target.value);


//     if ($event.target.value === 'English') {
//       localStorage.setItem('dir', 'ltr');
//     }
//     if ($event.target.value === 'العربية') {
//       localStorage.setItem('dir', 'rtl');
//     }

// console.log("test",this.dir)
//   }
}
