import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FacultyService } from 'src/app/Services/faculty.service';
import { UniversitiesService } from 'src/app/Services/universities.service';
@Component({
  selector: 'app-display-faculties',
  templateUrl: './display-faculties.component.html',
  styleUrls: ['./display-faculties.component.css']
})
export class DisplayFacultiesComponent implements OnInit {
  lstFaculties: any;
  lstUniversities:any;
  FacultyObj:any;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  constructor(private facultyService:FacultyService,private universityService: UniversitiesService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.FacultyObj={id:0,facultyName:"",universityID:0,universityName:""}
    this.universityService.getAllUniversities().subscribe(
      res => { this.lstUniversities = res,console.log("lstUniversities",this.lstUniversities) },
      err => console.log(err)
    )
    this.facultyService.getAllFaculties().subscribe(
      res => { this.lstFaculties = res,console.log("lstFaculties",this.lstFaculties) },
      err => console.log(err)
    )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.facultyService.getFacultyByID(id).subscribe(
      data => { this.FacultyObj = data, console.log(data) },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.FacultyObj={id:0,facultyName:"",universityID:0,universityName:""}
  }
  add() {
    this.FacultyObj.universityID=Number(this.FacultyObj.universityID);

    this.facultyService.addFaculty(this.FacultyObj).subscribe(
      res => {
        console.log("FacultyObj",res);
        this.NewDialogbool = false;
        this.ngOnInit()
      },
      error => console.log(error),
    );
  }
  EditDialog(id) {
    this.Editboolean = true;
    this.facultyService.getFacultyByID(id).subscribe(
      data => { this.FacultyObj = data,
         console.log("EditDialog",this.FacultyObj) },
      error => { console.log(error) }
    )
  }
  update(id) {
    console.log("id",id)
    this.facultyService.editFaculty(id,this.FacultyObj).subscribe(
      data => { console.log("data",data), this.ngOnInit() },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.facultyService.deleteFaculty(id).subscribe(
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
