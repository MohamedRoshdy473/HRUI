import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LeaveTypeService } from 'src/app/Services/leave-type.service';
@Component({
  selector: 'app-edit-leaves-type',
  templateUrl: './edit-leaves-type.component.html',
  styleUrls: ['./edit-leaves-type.component.css']
})
export class EditLeavesTypeComponent implements OnInit {
  leaveTypeObj:any;
  leaveTypeList:any;
  constructor(private leaveTypesService:LeaveTypeService ,private activeRoute: ActivatedRoute,private router :Router,private confirmationService: ConfirmationService, private messageService: MessageService,public datepipe: DatePipe) { 
    this.leaveTypeObj={Id:0,Name:""}
  }
  LeaveTypeID = this.activeRoute.snapshot.params['id'];

  ngOnInit(): void {
    this.leaveTypesService.GetAllLeavesTypeByID(this.LeaveTypeID).subscribe(
      (res)=>{this.leaveTypeObj=res,
        console.log("the name is "+res)},
      err=>console.log(err),
    )
  }
  update()
  {
    this.leaveTypesService.EditLeavesType(this.LeaveTypeID, this.leaveTypeObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/LeavesType']);
      },
      error => console.log(error),
    )
  }
    showSuccess() {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }
  
  showInfo() {
      this.messageService.add({severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showWarn() {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
  }
  
  showError() {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
  }
  
  showTopLeft() {
      this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showTopCenter() {
      this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showBottomCenter() {
      this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: 'Message Content'});
  }
  
  showConfirm() {
      this.messageService.clear();
      this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }
  
  showMultiple() {
      this.messageService.addAll([
          {severity:'info', summary:'Message 1', detail:'Message Content'},
          {severity:'info', summary:'Message 2', detail:'Message Content'},
          {severity:'info', summary:'Message 3', detail:'Message Content'}
      ]);
  }
  
  showSticky() {
      this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
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
  
  