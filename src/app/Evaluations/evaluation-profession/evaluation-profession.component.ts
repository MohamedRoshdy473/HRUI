import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EvaluationProfessionService } from 'src/app/Services/evaluation-profession.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
@Component({
  selector: 'app-evaluation-profession',
  templateUrl: './evaluation-profession.component.html',
  styleUrls: ['./evaluation-profession.component.css']
})
export class EvaluationProfessionComponent implements OnInit {
  EvaluationProfessions: any;
  EvaluationProfessionObj: any;
  Professions: any;
  EvaluationType:any
  ProfessionID:Number;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  representatives: { name: string; image: string; }
  @ViewChild('dt') table: Table;
  constructor(private EvaluationTypeService:EvaluationTypeService,private EvaluationProfessionService:EvaluationProfessionService,private EmployeeService:EmployeeService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.EvaluationProfessionObj={id:0,evaluationTypeID:0,evaluationTypeName:"",professionID:0,professionName:""}
   }

  ngOnInit(): void {
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
          ,
          console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationTypeService.GetAllEvalutaionType().subscribe(
      data => {
        this.EvaluationType = data
          ,
          console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationProfessionService.GetEvaluationProfession().subscribe(
      data => {
        this.EvaluationProfessions = data
          ,
          console.log(data)
      },
      error => { console.log(error) }
    )
  }
  onOptionsSelected(ProfessionID:number){
    console.log("the EvaluationByProfessionId value is " + ProfessionID);
    // this.EvaluationProfessionService.GetEvaluationByProfessionId(ProfessionID).subscribe(
    //     res=> {
    //       console.log(res);
    //       this.EvaluationProfessions=res     
    //     },
    //     err=>console.log(err)
    //   )

      console.log("the EvaluationTypeByProfessionId value is " + ProfessionID);
      this.EvaluationProfessionService.GetEvaluationByProfessionId(ProfessionID).subscribe(
          res=> {
            console.log(res);
            this.EvaluationProfessions=res     
          },
          err=>console.log(err)
        )
}
  onRepresentativeChange(event) {
    this.table.filter(event.value, 'type', 'in')
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    console.log(id);
    this.EvaluationProfessionService.GetEvaluationProfessionByID(id).subscribe(
      data => {
        this.EvaluationProfessionObj = data
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
        this.EvaluationProfessionService.DeleteEvaluationProfession(id).subscribe(
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
