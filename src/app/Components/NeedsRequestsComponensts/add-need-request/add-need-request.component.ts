import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NeedRequestService } from 'src/app/Services/need-request.service';
import { NeedRequest } from 'src/app/Data_Types/NeedRequest';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Employee } from 'src/app/Data_Types/employee';
import { CategoryService } from 'src/app/Services/category.service';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';
@Component({
  selector: 'app-add-need-request',
  templateUrl: './add-need-request.component.html',
  styleUrls: ['./add-need-request.component.css']
})
export class AddNeedRequestComponent implements OnInit {
  needRequests: any;
  employees: any;
  categories: any;
  subcategorydisplay: any;
  role: string;
  EmployeesByHR: Object;
  EmployeesByManager: Object;
  empId: number;
  constructor(private subCategoryService: SubCategoryServiceService, private needrequestservice: NeedRequestService, private categoryservice: CategoryService, private router: Router, private employeeservice: EmployeeService) {
    this.needRequests = { id: 0, EmployeeId: 0, CategoryId: 0, SubCategoryId: 0, EmployeeName: '', CategoryName: '', SubCategoryName: '', needRequestDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), Comment: '',Status:"pending" }
  }
  ngOnInit(): void {
    this.role = localStorage.getItem("roles");
    this.empId = Number(localStorage.getItem('id'))

    this.employeeservice.GetAllEmployees().subscribe(
      data => {
        this.EmployeesByHR = data
        //, console.log(data)
      },
      error => { console.log(error) }
    )
    this.employeeservice.EmployeeByProfession(this.empId).subscribe(
      data => {
        this.EmployeesByManager = data
        , console.log("EmployeeByProfession",data)
      },
      error => { console.log(error) }
    )
    this.categoryservice.getAllcategory().subscribe(
      (res) => { this.categories = res; },
      (err) => console.log(err)
    )
  }
  onOptionsSelected(categoryId: number) {
    console.log("the selected value is " + categoryId);
    this.subCategoryService.getsubCategoryByCategoryID(categoryId).subscribe(
      res => {
        console.log(res);
        this.subcategorydisplay = res
      },
      err => console.log(err)
    )
  }
  AddNeedRequest() {
    this.needRequests.EmployeeId = Number(this.needRequests.EmployeeId);
    this.needRequests.CategoryId = Number(this.needRequests.CategoryId);
    this.needRequests.SubCategoryId = Number(this.needRequests.SubCategoryId);
    console.log(this.needRequests)
    this.needrequestservice.addNeedRequest(this.needRequests).subscribe(
      res => { this.router.navigate(['/NeedRequest']); },
      err => console.log(err),
    );
  }
}
