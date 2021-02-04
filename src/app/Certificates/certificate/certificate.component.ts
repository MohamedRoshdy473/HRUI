import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {EmployeeService} from 'src/app/Services/employee.service';
import{CertificateService} from 'src/app/Services/certificate.service'
import { Table } from 'primeng/table';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
certificateObj:any;
certificateList:any;
employee:any;
displayBasic: boolean;
loading: boolean = true;
submitted: boolean;
representatives: { name: string; image: string; }
@ViewChild('dt') table: Table;
  constructor(private certificateService:CertificateService, private EmployeeService: EmployeeService, private confirmationService: ConfirmationService,
    private messageService: MessageService) {
this.certificateObj={
  Id:0,Certificate:"",CertificateDate:new Date(),CertificatePlace:"",EmployeeID:0,EmployeeName:""
}
     }
  ngOnInit(): void {
    this.EmployeeService.GetAllEmployees().subscribe(
      (res)=>{this.employee=res},
      err=>console.log(err)
    )

    this.certificateService.getAllCertificates().subscribe(
      (res)=>{this.certificateList=res},
      err=>console.log(err)
    )
  }
  onOptionsSelected(employeeID: number) {
    console.log("the employeeID value is " + employeeID);
    this.certificateService.GetCertificatesByEmployee(employeeID).subscribe(
      res => {
        //console.log(" data is : ",res);
        this.certificateList = res
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
    console.log(id);
    this.certificateService.geCertificateByID(id).subscribe(
      data => {
        this.certificateObj = data
          ,
          console.log(data)
      },
      error => { console.log(error) }
    )
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.certificateService.deleteCertificate(id).subscribe(
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
