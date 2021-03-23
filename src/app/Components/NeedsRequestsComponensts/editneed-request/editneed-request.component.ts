import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { from } from 'rxjs';
import { CategoryService } from 'src/app/Services/category.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { NeedRequestService } from 'src/app/Services/need-request.service';
import { SubCategoryServiceService } from 'src/app/Services/sub-category-service.service';

@Component({
  selector: 'app-editneed-request',
  templateUrl: './editneed-request.component.html',
  styleUrls: ['./editneed-request.component.css'],
  providers: [DatePipe]

})
export class EditneedRequestComponent implements OnInit {
  needRequest:any;
  employees:any;
  categories: any;
  subcategorydisplay: any;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  needRequestDate:Date;
  representatives: { name: string; image: string; }
  @ViewChild('dt') table: Table;
  NeedRequestID = this.activeRoute.snapshot.params['id'];
  constructor(private needrequestService: NeedRequestService,private empService:EmployeeService ,
    private router: Router,private CategoryService:CategoryService,private SubCategoryService:SubCategoryServiceService
    , private activeRoute: ActivatedRoute,public datepipe: DatePipe,
    private confirmationService: ConfirmationService,private messageService: MessageService) {
      this.needRequest={id:0,EmployeeId:0,EmployeeName:'', Type:'',needRequestDate:new Date(),Comment:''}
     }
  ngOnInit(): void {
    this.empService.GetAllEmployees().subscribe(
      (res)=>{
        //console.log(res)
        this.employees=res;},
      (err)=>console.log(err)
    )
    this.CategoryService.getAllcategory().subscribe(
      (res)=>{
        //console.log(res)
        this.categories=res;},
      (err)=>console.log(err)
    )
    this.SubCategoryService.getAllsubcategory().subscribe(
      (res)=>{
        //console.log(res)
        this.subcategorydisplay=res;},
      (err)=>console.log(err)
    )

    this.needrequestService.getNeedrequestByID(this.NeedRequestID).subscribe(
      (res)=>{
        console.log(res)
        this.needRequest=res;},
      (err)=>console.log(err)
    )
  }

  onOptionsSelected(categoryId: number) {
    console.log("the selected value is " + categoryId);
    this.SubCategoryService.getsubCategoryByCategoryID(categoryId).subscribe(
      res => {
        //console.log(res);
        this.subcategorydisplay = res
      },
      err => console.log(err)
    )
  }
  onRepresentativeChange(event) {
    this.table.filter(event.value, 'type', 'in')
  }

  update()
  {

    this.needRequest.needRequestDate = this.requestedDate;
    this.needrequestService.editNeedRequest(this.NeedRequestID, this.needRequest).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/NeedRequest']);
      },
      error => console.log(error),
    )
  }
  formatDate(needRequestDate) {
    let month = needRequestDate.getMonth() + 1;
    let day = needRequestDate.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return needRequestDate.getFullYear() + '-' + month + '-' + day;
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


  requestedDate:string
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.requestedDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    console.log(this.requestedDate)
}
}


