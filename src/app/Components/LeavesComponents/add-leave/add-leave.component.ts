import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LeaveService } from 'src/app/Services/leave.service';
import { UploadFilesService } from 'src/app/Services/upload-files.service';
import { LeaveRequest } from 'src/app/Data_Types/leave-request';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LeaveTypeService } from 'src/app/Services/leave-type.service';
import { date } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-add-leave',
  templateUrl: './add-leave.component.html',
  styleUrls: ['./add-leave.component.css']
})
export class AddLeaveComponent implements OnInit {

  LeaveRequestObj: LeaveRequest;
  OldAddress = false;
  EndDate: Date;
  EmployeeByProfession: any;
  LeaveTypes: any;
  img:string
  selectedFiles: FileList;
  progressInfos = [];
  message = '';

  fileInfos: Observable<any>;
  empId: number;

  constructor(private EmpService: EmployeeService, private LeaveTypeService:LeaveTypeService,
    private Leaveservice: LeaveService,private router :Router,private messageService: MessageService
    ,private uploadService: UploadFilesService) {
    this.LeaveRequestObj = {id:0,alternativeEmp:"",date:new Date(),end:new Date(),
      comment: '', alternativeAddress: '', status: 'pending', leavesFiles: '',employeeName:"",profession:"",
      alternativeEmpID: 0, days: 0, employeeID: 0, leaveTypeID: 0, start: new Date(Date.now())
    }
  }

  // @ViewChild('someInput') someInput: ElementRef;

  ngOnInit(): void {
    this.empId = Number(localStorage.getItem('id'))
    this.EmpService.EmployeeByProfession(this.empId).subscribe(
      data => { console.log(data), this.EmployeeByProfession = data },
      error => console.log(error)
    );
    this.LeaveTypeService.GetAllLeavesType().subscribe(
      data => { console.log("GetLeaveTypes",data), this.LeaveTypes = data },
      error => console.log(error)
    );

    this.fileInfos = this.uploadService.getFiles();
  }

  add() {
    console.log(this.LeaveRequestObj);
    this.LeaveRequestObj.alternativeEmpID = Number(this.LeaveRequestObj.alternativeEmpID);
    this.LeaveRequestObj.leaveTypeID = Number(this.LeaveRequestObj.leaveTypeID);
    console.log(typeof (this.LeaveRequestObj.alternativeEmpID))
    console.log(this.LeaveRequestObj.alternativeEmpID);
    this.LeaveRequestObj.employeeID =Number(localStorage.getItem("id"));;
   console.log("this.LeaveRequest.EmployeeID",this.LeaveRequestObj)
    this.Leaveservice.addLeave(this.LeaveRequestObj).subscribe(
      data => { 
        var usrRole =  localStorage.getItem("roles");
        if(usrRole == "Admin")
        {
        this.router.navigate(['/AllLeaves']); 
        }
        if(usrRole == "User")
        {
         console.log("usrRole",usrRole);
           //this.ngOnInit();
          // this.router.navigate(['/AddLeave']);
          //this.showSuccess();
          this.router.navigate(['/AllLeaves']);
          this.messageService.add({ severity: 'info', summary: 'Record Added!', detail: 'Record Added!' });

        }
      },
      error => console.log(error)
    );
  }
  jj() {
    alert('dd');
  }
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    // console.log(this.LeaveRequest.Files);
    // console.log(this.selectedFiles);
    this.uploadFiles()
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const oldName = this.selectedFiles[i].name;
      console.log(oldName)
     this.img=oldName
     console.log(this.img)
      const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const lengthOfCode = 40;
      const newName = this.makeRandom(lengthOfCode, possible);
      this.LeaveRequestObj.leavesFiles=this.LeaveRequestObj.leavesFiles.concat(','+ newName + fileExtension);
      Object.defineProperty(this.selectedFiles[i], 'name', {
        writable: true,
        value: newName + fileExtension
      });
      console.log(this.selectedFiles[i].name)
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx, file) {
    console.log(file.name)

    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

  makeRandom(lengthOfCode, possible) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
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
