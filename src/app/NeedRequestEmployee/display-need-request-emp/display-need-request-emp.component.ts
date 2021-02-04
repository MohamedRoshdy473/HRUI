import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NeedRequestService } from 'src/app//Services/need-request.service';
import { NeedRequest } from 'src/app/Data_Types/NeedRequest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';
import { CategoryService } from 'src/app/Services/category.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-need-request-emp',
  templateUrl: './display-need-request-emp.component.html',
  styleUrls: ['./display-need-request-emp.component.css']
})
export class DisplayNeedRequestEmpComponent implements OnInit {
  needRequest: any;
  needRequests: any;
  Categories: any;
  Employees:any;
  subcategory: any;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  employeeId:any;
  representatives: { name: string; image: string; }
  @ViewChild('dt') table: Table;
  constructor(private employeeservice:EmployeeService, private activeRoute: ActivatedRoute,private subCategoryService:SubCategoryServiceService,private categoryService:CategoryService,private needrequestservice: NeedRequestService, private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.needRequest = {id:0,EmployeeId:0,CategoryId:0,SubCategoryId:0, EmployeeName: '',CategoryName:'',SubCategoryName:'', Date: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), Comment: '' }
  }
  ngOnInit(): void {
    //this.employeeId = this.activeRoute.snapshot.params['id'];
    //console.log(this.employeeId);
   var id= localStorage.getItem("id");
  // console.log(id);
    this.needrequestservice.GetNeedRequestsByEmployeeId(id).subscribe(
      (data) => {
        this.needRequests = data,
        this.loading = false;
      }
    )
    this.needrequestservice.getNeedrequestcategories().subscribe(
      (data) => {
        this.Categories = data;
        //console.log(data);
        //console.log(this.Categories);

        this.loading = false;
      }
    );

    this.subCategoryService.getAllsubcategory().subscribe(
      (data) => {
        this.subcategory = data;
       // console.log(data);
        this.loading = false;
      })
    this.categoryService.getAllcategory().subscribe(
      res => this.Categories = res,
      err => console.log(err)
    )
  }
  onOptionsSelected(categoryId:number,empId){
   // console.log("the selected value is " + categoryId);
    this.subCategoryService.getsubCategoryByCategoryID(categoryId).subscribe(
        res=> {
          //console.log(res);
          this.subcategory=res;
        },
        err=>console.log(err)
      );

   // console.log("the selected value is " + categoryId);
      this.needrequestservice.GetNeedRequestsByCategoryId(categoryId).subscribe(
        res=> {
         // console.log(res);
          this.needRequests=res;
        },
        err=>console.log(err)
      )

      this.needrequestservice.GetNeedRequestsByEmployeeIdByCategoryId(empId,categoryId).subscribe(
        res=> {
         // console.log(res);
          this.needRequests=res;
        },
        err=>console.log(err)
      )
}
  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }
  onRepresentativeChange(event) {
    this.table.filter(event.value, 'type', 'in')
  }
  
  showBasicDialog(id) {
    this.displayBasic = true;
    //console.log(id);
    this.needrequestservice.getNeedrequestByID(id).subscribe(
      data => {
        this.needRequest = data;
          //console.log(data)
      },
      error => { console.log(error) }
    )
  }

  confirm(Id) {
    console.log("confirm is :", Id);
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.needrequestservice.deleteNeedRequest(Id).subscribe(
              data=>{
                this.ngOnInit(),
                this.messageService.add({severity:'info', summary:'Record Deleted!', detail:'Record Deleted!'});
              }
            )
        }
    });
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  showMultiple() {
    this.messageService.addAll([
      { severity: 'info', summary: 'Message 1', detail: 'Message Content' },
      { severity: 'info', summary: 'Message 2', detail: 'Message Content' },
      { severity: 'info', summary: 'Message 3', detail: 'Message Content' }
    ]);
  }

  showSticky() {
    this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'Message Content', sticky: true });
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

}
