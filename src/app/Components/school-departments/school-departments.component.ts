import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SchoolDepartments } from 'src/app/Data_Types/SchoolDepartments';
import { SchoolDepartmentsService } from 'src/app/Services/school-departments.service';
import { SchoolService } from 'src/app/Services/school.service';
@Component({
  selector: 'app-school-departments',
  templateUrl: './school-departments.component.html',
  styleUrls: ['./school-departments.component.css']
})
export class SchoolDepartmentsComponent implements OnInit {
  lstSchools: any;
  SchoolObj:any;
  lstSchoolDepartments:any;
  SchoolDepartmentObj:any;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  constructor(private  schoolService: SchoolService,private schoolSepartmentService: SchoolDepartmentsService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.SchoolDepartmentObj={id:0,schoolDepartmentName:'',schoolId:0,schoolName:''}
    this.schoolService.getAllSchool().subscribe(
      res => { this.lstSchools = res,console.log("lstSchools",this.lstSchools) },
      err => console.log(err)
    )
    this.schoolSepartmentService.getAllSchoolDepartment().subscribe(
      res => { this.lstSchoolDepartments = res,console.log("lstSchoolDepartments",this.lstSchoolDepartments) },
      err => console.log(err)
    )
  }
  onchangeSchool($event) {
    this.schoolSepartmentService.GetAllSchoolDepartmentsBySchoolId($event.target.value).subscribe(
      res => { this.lstSchoolDepartments = res; console.log("lstSchoolDepartments", this.lstSchoolDepartments) },
      err => console.log(err)
    )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.schoolSepartmentService.getSchoolDepartmentByID(id).subscribe(
      data => { this.SchoolDepartmentObj = data, console.log(data) },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    // this.SchoolObj={id:0,schoolName:""}
    this.SchoolDepartmentObj.schoolDepartmentName="";
  }
  add() {
    this.SchoolDepartmentObj.schoolId=Number(this.SchoolDepartmentObj.schoolId);
    this.schoolSepartmentService.addSchoolDepartment(this.SchoolDepartmentObj).subscribe(
      res => {
        console.log("SchoolDepartment",res);
        this.NewDialogbool = false;
        this.ngOnInit()
      },
      error => console.log(error),
    );
    this.lstSchools=[];

  }
  EditDialog(id) {
    this.Editboolean = true;
    this.schoolSepartmentService.getSchoolDepartmentByID(id).subscribe(
      data => { this.SchoolDepartmentObj = data,
         console.log("EditDialog",this.SchoolDepartmentObj) },
      error => { console.log(error) }
    )
  }
  update(id) {
    console.log("id",id)
    this.schoolSepartmentService.editSchoolDepartment(id,this.SchoolDepartmentObj).subscribe(
      data => { console.log("data",data), this.ngOnInit() },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.schoolSepartmentService.deleteSchoolDepartment(id).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
          }
        )
      }
    });
  }
  //Toast
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
