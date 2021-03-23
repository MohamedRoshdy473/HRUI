import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LeaveTypeService } from 'src/app/Services/leave-type.service';
@Component({
  selector: 'app-leaves-type',
  templateUrl: './leaves-type.component.html',
  styleUrls: ['./leaves-type.component.css']
})
export class LeavesTypeComponent implements OnInit {
  loading: boolean = true;
  displayBasic: boolean;
  @ViewChild('dt') table: Table;
  leaveTypeObj:any;
  leaveTypeList:any;
  constructor(private leaveTypesService:LeaveTypeService,private confirmationService: ConfirmationService, private messageService: MessageService) { 
this.leaveTypeObj={Id:0,Name:""}
  }

  ngOnInit(): void {
    this.leaveTypesService.GetAllLeavesType().subscribe(
      (data)=>{
          this.leaveTypeList=data,
          console.log(data)
      },
      (err)=>{console.log(err)}
  )
  this.loading = false;
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    this.leaveTypesService.GetAllLeavesTypeByID(id).subscribe(
        data=>{
          this.leaveTypeObj=data,
          console.log(data)},
        error=>{console.log(error)}
    )
}

confirm(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.leaveTypesService.DeleteLeavesType(id).subscribe(
              data=>{
                this.ngOnInit(),
                this.messageService.add({severity:'info', summary:'Record Deleted!', detail:'Record Deleted!'});
              }
            )
        }
    });
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
