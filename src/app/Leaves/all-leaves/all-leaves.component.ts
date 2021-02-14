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
import { environment } from 'src/environments/environment';
import { ProfessionService } from 'src/app/Services/profession.service';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrls: ['./all-leaves.component.css'],
  providers: [DatePipe]

})
export class AllLeavesComponent implements OnInit {
  AllLeaves: any;
  ApprovedLeaves: any;
  DisApprovedLeaves: any;
  pendingLeaves: any;
  
  AllLeavesByManager: any;
  ApprovedLeavesByManager: any;
  DisApprovedLeavesByManager: any;
  pendingLeavesByManager: any;
  
  Professions: any;
  Leave: any;
  displayBasic: boolean;
  EditLeave: boolean;
  NewLeaveRequest: LeaveRequest;
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
  empId: number;
  role: string;
  LeavesForEmployee: any;
  img:string
 Allimages:string;
 requestLeaveId:number
  getimage: string;
  ProfessionByEmployeeId: any;
  constructor(private EmpService: EmployeeService, private Leaveservice: LeaveService, private LeaveTypeService: LeaveTypeService
    , private router: Router, private messageService: MessageService, private datePipe: DatePipe,private professionService:ProfessionService
    , private uploadService: UploadFilesService, private sanitizer: DomSanitizer,
    private confirmationService: ConfirmationService) {
    this.Leave = {
      Comment: '', AlternativeAddress: '', Status: 'pending',
      AlternativeEmpID: 0, Days: 0, EmployeeID: 0, LeaveTypeID: 0, start: new Date(Date.now())
    };

    // this.Leaveservice.PendingLeaves().subscribe(
    //   data => { this.pendingLeaves = data },
    //   error => console.log(error)
    // );

  }

  ngOnInit(): void {
    this.Allimages="";
    this.getimage = environment.getImageByName

    this.NewLeaveRequest = {id:0,profession:"",alternativeEmp:"",date:new Date(),end:new Date(),
    comment: '', alternativeAddress: '', status: 'pending', leavesFiles: '',employeeName:"",
    alternativeEmpID: 0, days: 0, employeeID: 0, leaveTypeID: 0, start: new Date(Date.now())
  };
    this.AllAlternativeEmployeesByProfession=[]

    this.Leaveservice.AllLeaves().subscribe(
      data => { this.AllLeaves = data },
      error => console.log(error)
    );

    this.Leaveservice.ApprovedLeaves().subscribe(
      data => { this.ApprovedLeaves = data },
      error => console.log(error)
    );

    this.Leaveservice.DisApprovedLeaves().subscribe(
      data => { this.DisApprovedLeaves = data},
      error => console.log(error)
    );

    this.Leaveservice.PendingLeaves().subscribe(
      data => { this.pendingLeaves = data },
      error => console.log(error)
    );

    this.Leaveservice.GetLeaveRequestsByManager().subscribe(
      data => { this.AllLeavesByManager = data },
      error => console.log(error)
    );

    this.Leaveservice.ApprovedLeavesByManager().subscribe(
      data => { this.ApprovedLeavesByManager = data },
      error => console.log(error)
    );

    this.Leaveservice.DisApprovedLeavesByManager().subscribe(
      data => { this.DisApprovedLeavesByManager = data},
      error => console.log(error)
    );

    this.Leaveservice.PendingLeavesByManager().subscribe(
      data => { this.pendingLeavesByManager = data },
      error => console.log(error)
    );
    
    this.EmpService.getProfession().subscribe(
      data => { this.Professions = data },
      error => console.log(error)
    );

    this.LeaveTypeService.GetAllLeavesType().subscribe(
      data => { this.LeaveTypes = data },
      error => console.log(error)
    );
    this.EmpService.EmployeeByProfession().subscribe(
      data => {  this.EmployeeByProfession = data,console.log("EmployeeByProfession",this.EmployeeByProfession) },
      error => console.log(error)
    );
    this.empId = Number(localStorage.getItem('id'))
    this.role=localStorage.getItem("roles");
    this.Leaveservice.GetAllLeavesForEmployeeId(this.empId).subscribe(
      data => { this.LeavesForEmployee = data; },
      error => console.log(error)
    );
  }

  approve(ID) {
    alert(ID);
    this.Leaveservice.approve(ID).subscribe(
      res => { this.ngOnInit() },
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
        this.Leave = data,
        console.log("Leave",this.Leave) 
        //,this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
      },
      error => { console.log(error) }
    );
    this.Leaveservice.getrequestLeaveByID(id).subscribe(
      data => { this.getLeavesfiles = data;
        this.requestLeaveId=id;
        console.log("getLeavesfiles",this.getLeavesfiles) },
      error => console.log(error)
    )
  }

  NewLeaveDialog() {
    this.NewLeaveDialogbool = true;
    this.NewLeaveRequest = {id:0,profession:"",alternativeEmp:"",date:new Date(),end:new Date(),
    comment: '', alternativeAddress: '', status: 'pending', leavesFiles: '',employeeName:"",
    alternativeEmpID: 0, days: 0, employeeID: 0, leaveTypeID: 0, start: new Date(Date.now())
  };
    this.EmpService.getProfession().subscribe(
      data => this.AllProfessions = data,
      error => console.log(error)
    );
    this.professionService.GetProfessionByEmployeeId(this.empId).subscribe(
      data=>{this.ProfessionByEmployeeId=data,console.log("ProfessionByEmployeeId",data)},
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
    this.AllEmployeesByProfession.forEach(element => {
     if(element.id != AlternateEmpId)
     {
         this.AllAlternativeEmployeesByProfession.push(element)
     }
    });
  }


  addNewLeave() {
    console.log("NewLeaveRequest",this.NewLeaveRequest);
    this.NewLeaveRequest.alternativeEmpID = Number(this.NewLeaveRequest.alternativeEmpID);
    this.NewLeaveRequest.leaveTypeID = Number(this.NewLeaveRequest.leaveTypeID);
    this.NewLeaveRequest.employeeID = Number(this.NewLeaveRequest.employeeID);
    this.Leaveservice.addLeave(this.NewLeaveRequest).subscribe(
      data => {
        console.log("data",data);
        this.NewLeaveDialogbool = false;
        this.ngOnInit();
        this.router.navigateByUrl['/allLeaves']
      },
      error => console.log(error)
    )
  }
  EditLeaveDialog(id) {
    this.EditLeave = true;
    this.Leaveservice.getLeaveByID(id).subscribe(
      data => {
         this.NewLeaveRequest = data,
         console.log("NewLeaveRequest",data)
         console.log("editNewLeaveRequest1",this.NewLeaveRequest)
         },
      error => { console.log(error) }
    )
    this.EmpService.EmployeeByProfession().subscribe(
      data => {  this.EmployeeByProfession = data,console.log("EmployeeByProfession",this.EmployeeByProfession) },
      error => console.log(error)
    );
    // this.Leaveservice.getrequestLeaveByID(id).subscribe(
    //   data => { this.getLeavesfiles = data; console.log("images",data) },
    //   error => console.log(error)
    // )
  }
  EditLeaveRequest(id)
  {
    console.log("editNewLeaveRequest",this.NewLeaveRequest);
    // this.NewLeaveRequest.alternativeEmpID = Number(this.NewLeaveRequest.alternativeEmpID);
     this.Leaveservice.updateLeave(id,this.NewLeaveRequest).subscribe(
      data => {
        console.log("Updated data",data);
        this.EditLeave = false;
       // this.ngOnInit();
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
     console.log(this.selectedFiles);
    this.uploadFiles()
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const oldName = this.selectedFiles[i].name;
      console.log("oldName",oldName)
      this.img = oldName
      console.log(this.img)
      const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      const lengthOfCode = 40;
      const newName = this.makeRandom(lengthOfCode, possible);
      console.log("newName",newName);
      console.log("fileExtension",fileExtension);
      console.log("this.NewLeaveRequest.leavesFiles",this.NewLeaveRequest.leavesFiles);
      this.NewLeaveRequest.leavesFiles="";
      console.log("image",this.NewLeaveRequest.leavesFiles.concat(',',newName + fileExtension));
      this.NewLeaveRequest.leavesFiles=this.NewLeaveRequest.leavesFiles.concat(','+ newName + fileExtension);
      Object.defineProperty(this.selectedFiles[i], 'name', {
        writable: true,
        value: newName + fileExtension
      });
      console.log("uploaded image",this.selectedFiles[i].name)
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

  DeleteImage(LeaveImageId)
  {
    this.Leaveservice.DeleteLeaveImage(LeaveImageId).subscribe(
      data => {
          this.messageService.add({ severity: 'info', summary: 'Image Deleted!', detail: 'Image Deleted!' });
          this.Leaveservice.getrequestLeaveByID(this.requestLeaveId).subscribe(
            data => { this.getLeavesfiles = data;console.log("getLeavesfiles",this.getLeavesfiles) },
            error => console.log(error)
          )
      }
    )
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
  OpenImage(item){
   var filePath = `${environment.getImageByName}wwwroot/images/${item}`;
    console.log("item",filePath)
    window.open(filePath);
  }

}
