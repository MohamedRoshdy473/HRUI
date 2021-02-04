import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
import { EvaluationProfessionService } from 'src/app/Services/evaluation-profession.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EvaluationService } from 'src/app/Services/evaluation.service';
import {RatingModule} from 'primeng/rating';
import{Evaluation} from 'src/app/Data_Types/Evaluation'



@Component({
  selector: 'app-display-evaluations',
  templateUrl: './display-evaluations.component.html',
  styleUrls: ['./display-evaluations.component.css']
})
export class DisplayEvaluationsComponent implements OnInit {
  EvaluationObj: any;
  EvaluationList: any;
  EvaluationProfessionObj: any;
  Professions: any;
  Employees:any;
  EvaluationType: any
  ProfessionID: Number;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;


  representatives: { name: string; image: string; }
  @ViewChild('dt') table: Table;
  constructor(private EvaluationTypeService: EvaluationTypeService,
    private EvaluationService: EvaluationService,
    private EvaluationProfessionService: EvaluationProfessionService,
    private EmployeeService: EmployeeService, private confirmationService: ConfirmationService,
    private messageService: MessageService) {
      this.EvaluationObj={id:0,employeeID:0,employeeName:"",evaluationProfessionID:0,evaluationTypeName:""
    ,professionName:"",evaluationDegreee:0,evaluationDate:new Date(),note:""}
     }

  ngOnInit(): void {
    this.EvaluationService.GetAllEvaluations().subscribe(
      data => {
        this.EvaluationList = data        
          //, console.log(data)
      },
      error => { console.log(error) }
    )
    this.EmployeeService.GetAllEmployees().subscribe(
      data => {
        this.Employees = data       
          //, console.log(data)
      },
      error => { console.log(error) }
    )
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data         
        // , console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationTypeService.GetAllEvalutaionType().subscribe(
      data => {
        this.EvaluationType = data        
          //,console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationProfessionService.GetEvaluationProfession().subscribe(
      data => {
        this.EvaluationProfessionObj = data          
         // ,console.log(data)
      },
      error => { console.log(error) }
    )
  }
  onOptionsSelected(employeeID: number) {
    console.log("the employeeID value is " + employeeID);
    this.EvaluationService.GetEvaluationByemployeeID(employeeID).subscribe(
      res => {
        //console.log(" data is : ",res);
        this.EvaluationList = res
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
    this.EvaluationService.GetEvaluationID(id).subscribe(
      data => {
        this.EvaluationObj = data
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
        this.EvaluationService.DeleteEvaluation(id).subscribe(
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
