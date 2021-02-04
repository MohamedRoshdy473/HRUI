import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificateService } from 'src/app/Services/certificate.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-edit-certificates',
  templateUrl: './edit-certificates.component.html',
  styleUrls: ['./edit-certificates.component.css'],
  providers: [DatePipe]

})
export class EditCertificatesComponent implements OnInit {
  certificateObj:any;
  certificateList:any;
  Employees:any;
  constructor(public datepipe: DatePipe,private certificateService:CertificateService, private EmployeeService: EmployeeService,private confirmationService: ConfirmationService, private activeRoute: ActivatedRoute,
    private router: Router, private messageService: MessageService) { 
      this.certificateObj={
        Id:0,Certificate:"",CertificateDate:new Date(),CertificatePlace:"",EmployeeID:0,EmployeeName:""
      }
    }
    CertificateID = this.activeRoute.snapshot.params['id'];
  ngOnInit(): void {
    this.EmployeeService.GetAllEmployees().subscribe(
      (res)=>{this.Employees=res},
      err=>console.log(err)
    )

    this.certificateService.geCertificateByID(this.CertificateID).subscribe(
      (res)=>{this.certificateObj=res},
      err=>console.log(err)
    )
  }

  update() {
    this.certificateObj.employeeID = Number(this.certificateObj.employeeID);
    this.certificateObj.certificateDate = this.cerDate;

    this.certificateService.editCertificate(this.CertificateID, this.certificateObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/Certificates']);
      },
      error => console.log(error),
    )
  }

  cerDate:string
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.cerDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    console.log(this.cerDate)
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