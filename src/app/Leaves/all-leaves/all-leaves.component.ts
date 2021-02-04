import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from 'src/app/Data_Types/leave-request';
import { EmployeeService } from 'src/app/Services/employee.service';
import { LeaveService } from 'src/app/Services/leave.service';
import { ConfirmationService, MessageService } from 'primeng/api'
import { UploadFilesService } from 'src/app/Services/upload-files.service';
import { error } from '@angular/compiler/src/util';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveTypeService } from 'src/app/Services/leave-type.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css'],
  providers: [DatePipe]

})
export class AllLeavesComponent implements OnInit {
  AllLeaves: any;
  ApprovedLeaves: any;
  Professions: any;
  Leave: any;
  DisApprovedLeaves: any;
  pendingLeaves: any;
  displayBasic: boolean;
  EditLeave: boolean;
  NewLeaveRequest: any;
  NewLeaveDialogbool: boolean;
  AllEmployees: any;
  AllProfessions: any;
  AllEmployeesByProfession: any;
  AllAlternativeEmployeesByProfession:any;
  ProfessionID: number;
  LeaveTypes: any;
  EmployeeByProfession: any;
  OldAddress = false;
  getLeavesfiles: any;

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;

  constructor(private EmpService: EmployeeService, private Leaveservice: LeaveService, private LeaveTypeService: LeaveTypeService
    , private router: Router, private messageService: MessageService, private datePipe: DatePipe
    , private uploadService: UploadFilesService, private sanitizer: DomSanitizer,
    private confirmationService: ConfirmationService) {
    this.Leave = {
      Comment: '', AlternativeAddress: '', Status: 'pending',
      AlternativeEmpID: 0, Days: 0, EmployeeID: 0, LeaveTypeID: 0, start: new Date(Date.now())
    };
    this.NewLeaveRequest = {
      Comment: '', AlternativeAddress: '', Status: 'pending', LeavesFiles: '',
      AlternativeEmpID: 0, Days: 0, EmployeeID: 0, LeaveTypeID: 0, start: new Date(Date.now())
    };
    this.Leaveservice.PendingLeaves().subscribe(
      data => { this.pendingLeaves = data, console.log(data) },
      error => console.log(error)
    );
  }

  ngOnInit(): void {

    this.AllAlternativeEmployeesByProfession=[]

    this.Leaveservice.AllLeaves().subscribe(
      data => { this.AllLeaves = data, console.log("AllLeaves",data) },
      error => console.log(error)
    );

    this.Leaveservice.ApprovedLeaves().subscribe(
      data => { this.ApprovedLeaves = data, console.log(data) },
      error => console.log(error)
    );

    this.Leaveservice.DisApprovedLeaves().subscribe(
      data => { this.DisApprovedLeaves = data, console.log(data) },
      error => console.log(error)
    );

    this.Leaveservice.PendingLeaves().subscribe(
      data => { this.pendingLeaves = data, console.log(data) },
      error => console.log(error)
    );
    this.EmpService.getProfession().subscribe(
      data => { this.Professions = data, console.log(data) },
      error => console.log(error)
    );

    this.LeaveTypeService.GetAllLeavesType().subscribe(
      data => { console.log("GetLeaveTypes", data), this.LeaveTypes = data },
      error => console.log(error)
    );
    this.EmpService.EmployeeByProfession().subscribe(
      data => { console.log(data), this.EmployeeByProfession = data },
      error => console.log(error)
    );
  }

  approve(ID) {
    alert(ID);
    this.Leaveservice.approve(ID).subscribe(
      res => { console.log(res), this.ngOnInit() },
      error => console.log(error),
    );

  }
  disapprove(ID) {
    this.Leaveservice.disapprove(ID).subscribe(
      res => { this.ngOnInit() },
      error => console.log(error),
    );
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    this.Leaveservice.getLeaveByID(id).subscribe(
      data => {
        this.Leave = data, console.log(data)
        //,this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
      },
      error => { console.log(error) }
    );
    this.Leaveservice.getrequestLeaveByID(id).subscribe(
      data => { this.getLeavesfiles = data; console.log(data) },
      error => console.log(error)
    )
  }
  EditLeaveDialog(id) {
    this.EditLeave = true;
    this.Leaveservice.getLeaveByID(id).subscribe(
      data => { this.NewLeaveRequest = data, console.log(data) },
      error => { console.log(error) }
    )
  }
  NewLeaveDialog() {
    this.NewLeaveDialogbool = true;
    this.EmpService.getProfession().subscribe(
      data => this.AllProfessions = data,
      error => console.log(error)
    );
    // this.EmpService.EmployeeByProfession().subscribe(
    //   data => { console.log(data), this.EmployeeByProfession = data },
    //   error => console.log(error)
    // );



  }
  onChange(deviceValue) {
    this.EmpService.GetAllEmployeesByProfession(deviceValue).subscribe(
      data => {
        this.AllEmployeesByProfession = data
      },
      error => console.log(error)
    )
  }
  onAlternateChange(AlternateEmpId: any) {
    this.AllAlternativeEmployeesByProfession=[]
    console.log("AlternateEmpId", AlternateEmpId);
    this.AllEmployeesByProfession.forEach(element => {
      console.log("element.employeeID",element.id)
      //console.log("element",element)
     if(element.id != AlternateEmpId)
     {
         this.AllAlternativeEmployeesByProfession.push(element)
     }
    });
    console.log("AllAlternativeEmployeesByProfession" ,this.AllAlternativeEmployeesByProfession);
  }


  addNewLeave() {
    console.log(this.NewLeaveRequest);
    this.NewLeaveRequest.AlternativeEmpID = Number(this.NewLeaveRequest.AlternativeEmpID);
    this.NewLeaveRequest.LeaveTypeID = Number(this.NewLeaveRequest.LeaveTypeID);
    this.NewLeaveRequest.EmployeeID = Number(this.NewLeaveRequest.EmployeeID);
    this.Leaveservice.addLeave(this.NewLeaveRequest).subscribe(
      data => {
        console.log(data);
        this.NewLeaveDialogbool = false;
        this.ngOnInit();
        this.router.navigateByUrl['/allLeaves']
      },
      error => console.log(error)
    )
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.Leaveservice.delete(id).subscribe(
          data => {
            this.ngOnInit(),
              this.messageService.add({ severity: 'info', summary: 'Record Deleted!', detail: 'Record Deleted!' });
          }
        )
      }
    });
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
      //this.img = oldName
      //console.log(this.img)
      const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const lengthOfCode = 40;
      const newName = this.makeRandom(lengthOfCode, possible);
      this.NewLeaveRequest.LeavesFiles = this.NewLeaveRequest.LeavesFiles.concat(',' + newName + fileExtension);
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
  openURl(url) {
    window.open(url)
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
