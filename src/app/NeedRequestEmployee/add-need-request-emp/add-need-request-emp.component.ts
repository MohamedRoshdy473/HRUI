import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { NeedRequestService } from 'src/app/Services/need-request.service';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';

@Component({
  selector: 'app-add-need-request-emp',
  templateUrl: './add-need-request-emp.component.html',
  styleUrls: ['./add-need-request-emp.component.css']
})
export class AddNeedRequestEmpComponent implements OnInit {
  needRequests: any;
  employees: any;
  categories: any;
  subcategorydisplay: any;
  constructor(private subCategoryService: SubCategoryServiceService, private needrequestservice: NeedRequestService, private categoryservice: CategoryService, private router: Router, private employeeservice: EmployeeService) {
    this.needRequests = { id: 0, EmployeeId: 0, CategoryId: 0, SubCategoryId: 0, EmployeeName: '', CategoryName: '', SubCategoryName: '', Date: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), Comment: '',Status:"pending" }
  }

  ngOnInit(): void {
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
    this.needRequests.EmployeeId =Number(localStorage.getItem("id"));;
    this.needRequests.CategoryId = Number(this.needRequests.CategoryId);
    this.needRequests.SubCategoryId = Number(this.needRequests.SubCategoryId);
    //console.log(this.needRequests);
    console.log("emp id : "+localStorage.getItem("id"))
    this.needrequestservice.addNeedRequestEmp(this.needRequests).subscribe(
      res => { this.router.navigate(['/NeedRequestEmp']); },
      err => console.log(err),
    );
  }
}
