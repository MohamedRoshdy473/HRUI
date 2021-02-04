import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CertificateService } from 'src/app/Services/certificate.service';
import { EmployeeService } from 'src/app/Services/employee.service';


@Component({
  selector: 'app-add-certificates',
  templateUrl: './add-certificates.component.html',
  styleUrls: ['./add-certificates.component.css']
})
export class AddCertificatesComponent implements OnInit {
  certificateObj:any;
  certificateList:any;
  employee:any;
  constructor(private certificateService:CertificateService, private EmployeeService: EmployeeService,private router: Router) {
    this.certificateObj={
      Id:0,Certificate:"",CertificateDate:new Date(),CertificatePlace:"",EmployeeID:0,EmployeeName:""
    }
   }

  ngOnInit(): void {
    this.EmployeeService.GetAllEmployees().subscribe(
      (res)=>{this.employee=res},
      err=>console.log(err)
    )
  }
  AddCertificate() {
    this.certificateObj.employeeID = Number(this.certificateObj.employeeID);
    this.certificateService.addCertificate(this.certificateObj).subscribe(
      (res) => { this.router.navigate(['/Certificates']); 
         console.log("certificateObj added : ",this.certificateObj);
    },
      err => console.log(err),
    );
  }
}
