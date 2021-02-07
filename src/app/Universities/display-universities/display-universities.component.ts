import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UniversitiesService } from 'src/app/Services/universities.service';
@Component({
  selector: 'app-display-universities',
  templateUrl: './display-universities.component.html',
  styleUrls: ['./display-universities.component.css']
})
export class DisplayUniversitiesComponent implements OnInit {

  lstUniversities: any;
  UniversityObj:any;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  constructor(private universityService: UniversitiesService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.UniversityObj={id:0,universityName:""}
    this.universityService.getAllUniversities().subscribe(
      res => { this.lstUniversities = res,console.log("lstUniversities",this.lstUniversities) },
      err => console.log(err)
    )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.universityService.getUniversityByID(id).subscribe(
      data => { this.UniversityObj = data, console.log(data) },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.UniversityObj={id:0,universityName:""}
  }
  add() {
    this.universityService.addUniversity(this.UniversityObj).subscribe(
      res => {
        console.log("UniversityObj",res);
        this.NewDialogbool = false;
        this.ngOnInit()
      },
      error => console.log(error),
    );
  }
  EditDialog(id) {
    this.Editboolean = true;
    this.universityService.getUniversityByID(id).subscribe(
      data => { this.UniversityObj = data,
         console.log("EditDialog",this.UniversityObj) },
      error => { console.log(error) }
    )
  }
  update(id) {
    console.log("id",id)
    this.universityService.editUniversity(id,this.UniversityObj).subscribe(
      data => { console.log("data",data), this.ngOnInit() },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.universityService.deleteUniversity(id).subscribe(
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
