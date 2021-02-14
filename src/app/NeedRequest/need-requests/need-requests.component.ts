import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { NeedRequestService } from 'src/app//Services/need-request.service';
import { NeedRequest } from 'src/app/Data_Types/NeedRequest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';
import { CategoryService } from 'src/app/Services/category.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-need-requests',
  templateUrl: './need-requests.component.html',
  styleUrls: ['./need-requests.component.css']
})
export class NeedRequestsComponent implements OnInit {
  needRequest: any;
  needRequests: any;
  lstPendingNeedsRequests: any;
  lstApprovedNeedsRequests: any;
  lstDisApprovedNeedsRequests: any;

  lstNeedsRequestsManager: any;
  lstPendingNeedsRequestsManager: any;
  lstApprovedNeedsRequestsManager: any;
  lstDisApprovedNeedsRequestsManager: any;

  lstNeedsRequestsByEmployee:any;
  
  Categories: any;
  Employees: any;
  subcategory: any;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  representatives: { name: string; image: string; }
  @ViewChild('dt') table: Table;
  empId: number;
  role: string;
  constructor(private employeeservice: EmployeeService, private subCategoryService: SubCategoryServiceService, private categoryService: CategoryService, private needrequestservice: NeedRequestService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.needRequest = { id: 0, EmployeeId: 0, CategoryId: 0, SubCategoryId: 0, EmployeeName: '', CategoryName: '', SubCategoryName: '', NeedRequestDate: new Date(), Comment: '' , Status:""}
  }
  ngOnInit(): void {
    this.empId = Number(localStorage.getItem('id'))
    this.role=localStorage.getItem("roles");
    this.employeeservice.GetAllEmployees().subscribe(
      (data) => {
        this.Employees = data;
        //console.log(data);
        this.loading = false;
      }
    )
    this.needrequestservice.getNeedrequest().subscribe(
      (data) => {
        this.needRequests = data;
        console.log(data);
        this.loading = false;
      }
    );
    this.needrequestservice.GetNeedRequestByManager().subscribe(
      (data) => {
        this.lstNeedsRequestsManager = data;
        console.log(data);
      }
    )
    this.needrequestservice.GetNeedRequestsByEmployeeId(this.empId).subscribe(
      (data) => {
        this.lstNeedsRequestsByEmployee = data;
        console.log(data);
      }
    )
    this.needrequestservice.GetPendingNeedRequest().subscribe(
      (data) => {
        this.lstPendingNeedsRequests= data;
        console.log(data);
      }
    )
    this.needrequestservice.GetPendingNeedRequestByManager().subscribe(
      (data) => {
        this.lstPendingNeedsRequestsManager= data;
        console.log(data);
      }
    )

    this.needrequestservice.GetApprovedNeedRequest().subscribe(
      (data) => {
        this.lstApprovedNeedsRequests= data;
        console.log(data);
      }
    )
    this.needrequestservice.GetApprovedNeedRequestByManager().subscribe(
      (data) => {
        this.lstApprovedNeedsRequestsManager= data;
        console.log(data);
      }
    )
    this.needrequestservice.GetDisApprovedNeedRequest().subscribe(
      (data) => {
        this.lstDisApprovedNeedsRequests= data;
        console.log(data);
      }
    )
    this.needrequestservice.GetDisApprovedNeedRequestByManager().subscribe(
      (data) => {
        this.lstDisApprovedNeedsRequestsManager= data;
        console.log(data);
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
  approve(NeedRquestId) {
    this.needrequestservice.approve(NeedRquestId).subscribe(
      res => { console.log(res), this.ngOnInit() },
      error => console.log(error),
    );

  }
  disapprove(NeedRquestId) {
    this.needrequestservice.disapprove(NeedRquestId).subscribe(
      res => { this.ngOnInit() },
      error => console.log(error),
    );
  }
  onOptionsSelected(categoryId: number, subCategoryId: number) {
    console.log("the categoryId 1 value is " + categoryId);
    this.subCategoryService.getsubCategoryByCategoryID(categoryId).subscribe(
      res => {
        //console.log(res);
        this.subcategory = res;
      },
      err => console.log(err)
    );
    //  console.log("the SubCategoryId value is " + subCategoryId);
    //   this.needrequestservice.GetNeedRequestsBySubCategoryId(subCategoryId).subscribe(
    //     res=> {
    //       console.log(res);
    //       this.needRequests=res;
    //     },
    //     err=>console.log(err)
    //   )
    console.log("the categoryId 2 value is " + categoryId);
    this.needrequestservice.GetNeedRequestsByCategoryId(categoryId).subscribe(
      res => {
        console.log(res);
        this.needRequests = res;
      },
      err => console.log(err)
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

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.needrequestservice.deleteNeedRequest(id).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
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
