import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/Services/employee.service';
import {ProfessionService} from 'src/app/Services/profession.service'
@Component({
  selector: 'app-display-professions',
  templateUrl: './display-professions.component.html',
  styleUrls: ['./display-professions.component.css']
})
export class DisplayProfessionsComponent implements OnInit {

  lstProfessions: any;
  lstEmployees:any;
  ProfessionObj:any;
  Editboolean: boolean;
  displayBasic: boolean;
  NewDialogbool: boolean;
  constructor(private empService:EmployeeService,private professionService: ProfessionService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.ProfessionObj={id:0,name:"",managerID:0,managerName:""}
    this.professionService.getAllProfession().subscribe(
      res => { this.lstProfessions = res,console.log("lstProfessions",this.lstProfessions) },
      err => console.log(err)
    )
    this.empService.GetAllEmployees().subscribe(
      res => { this.lstEmployees = res,console.log("lstEmployees",this.lstEmployees) },
      err => console.log(err)
    )
  }
  showBasicDialog(id) {
    this.displayBasic = true;
    this.professionService.getProfessionByID(id).subscribe(
      data => { this.ProfessionObj = data, console.log(data) },
      error => { console.log(error) }
    );
  }
  NewDialog() {
    this.NewDialogbool = true;
    this.ProfessionObj={id:0,name:""}
  }
  add() {
    this.ProfessionObj.managerID=Number(this.ProfessionObj.managerID);
    this.professionService.addProfession(this.ProfessionObj).subscribe(
      res => {
        console.log("ProfessionObj",res);
        this.NewDialogbool = false;
        this.ngOnInit()
      },
      error => console.log(error),
    );
  }
  EditDialog(id) {
    this.Editboolean = true;
    this.professionService.getProfessionByID(id).subscribe(
      data => { this.ProfessionObj = data,
         console.log("EditDialog",this.ProfessionObj) },
      error => { console.log(error) }
    )
  }
  update(id) {
    console.log("id",id)
    this.professionService.editProfession(id,this.ProfessionObj).subscribe(
      data => { console.log("data",data), this.ngOnInit() },
      error => { console.log(error) }
    );
    this.Editboolean = false;
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.professionService.deleteProfession(id).subscribe(
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
