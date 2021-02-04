import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  empId: number
  imgName: string
  employee: any
  role: string;
  getimage: string;
  constructor(
    private empService: EmployeeService, private router: Router
  ) { }
  ngOnInit(): void {
    this.getimage = environment.getImageByName
    this.role = localStorage.getItem("roles")
      this.empId = Number(localStorage.getItem('id'))
      this.empService.GetEmployee(this.empId).subscribe(w => {
        this.employee = w
        this.imgName = w.photo
      })
    this.employee = {Name:"",code:"",Phone:"",email:"",photo:"",
      address: '', ProfessionID: 0, ProfessionName: '', id: 0, dateOfBirth: new Date
    }
  }
  navigateToChangePassword(employee) {
    console.log(employee)
    this.router.navigate(['/changPaswword']);

  }
}
