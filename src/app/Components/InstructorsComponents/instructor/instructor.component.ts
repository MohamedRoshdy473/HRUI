import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InstructorService } from 'src/app/Services/instructor.service';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  InstructorObj:any;
  InstructorList:any;
  @ViewChild('dt') table: Table;
  displayBasic: boolean;
  submitted: boolean;
  constructor(private InstructorService:InstructorService,private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.InstructorObj={Id:0,InstructorName:"",Email:"",Phone:"",Address:"",HiringDate:new Date()}
  }
  ngOnInit(): void {
    this.InstructorService.GetAllInstructors().subscribe(
      (res) => {
        this.InstructorList = res;
      },
      err => console.log(err)
    )
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    console.log(id);
    this.InstructorService.GetInstructorByID(id).subscribe(
      data => {
        this.InstructorObj = data
          
         // ,console.log(data)
      },
      error => { console.log(error) }
    )
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.InstructorService.DeleteInstructor(id).subscribe(
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

