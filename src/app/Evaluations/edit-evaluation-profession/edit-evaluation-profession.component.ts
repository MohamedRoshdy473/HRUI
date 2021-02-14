import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
import { EvaluationProfessionService } from 'src/app/Services/evaluation-profession.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Profession } from 'src/app/Data_Types/profession';
import { EvaluationType } from 'src/app/Data_Types/EvalutaionType';
import { from } from 'rxjs';
import { visitNode } from 'typescript';

@Component({
  selector: 'app-edit-evaluation-profession',
  templateUrl: './edit-evaluation-profession.component.html',
  styleUrls: ['./edit-evaluation-profession.component.css']
})
export class EditEvaluationProfessionComponent implements OnInit {

  EvaluationProfessions: any;
  EvaluationProfessionObj: any;
  Professions: any;
  EvaluationType: any
  ProfessionID: Number;
  ProfID: Number;
  evaluationTypeID: Number;
   resultId:Number;
  EvaluationProfessionsID = this.activeRoute.snapshot.params['id'];
  constructor(private router: Router, private EvaluationTypeService: EvaluationTypeService, private activeRoute: ActivatedRoute, private EvaluationProfessionService: EvaluationProfessionService, private EmployeeService: EmployeeService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.EvaluationProfessionObj = { id: 0, evaluationTypeID: 0, evaluationTypeName: "", professionID: 0, professionName: "" }
  }

  ngOnInit(): void {
   this.resultId=0;
    // this.EvaluationProfessionService.GetEvaluationProfessionByID(this.EvaluationProfessionsID).subscribe(
    //   data => {
    //     this.EvaluationProfessionObj = data,
    //     this.resultId = this.EvaluationProfessionObj.professionID
    //         console.log("resultId",this.resultId)

    //         this.EvaluationProfessionService.GetEvaluationNotByProfessionId(this.resultId).subscribe(
    //           res => {
    //             this.EvaluationProfessions = res
    //             ,console.log("resultId in onOptionsSelected ", this.resultId);
    //           },
    //           err => console.log(err)
    //         )
    //   },
    //   error => { console.log(error) }
    // )
    //this.ProfessionID=this.resultId;
    // this.EvaluationProfessionService.GetEvaluationNotByProfessionId(this.resultId).subscribe(
    //   res => {
    //     this.EvaluationProfessions = res
    //     ,console.log("resultId in onOptionsSelected ", this.resultId);
    //   },
    //   err => console.log(err)
    // )


   // console.log("EvaluationProfessionObj" + this.EvaluationProfessionObj);
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
        //,console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationTypeService.GetAllEvalutaionType().subscribe(
      data => {
        this.EvaluationType = data
        // ,console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationProfessionService.GetEvaluationProfession().subscribe(
      data => {
        this.EvaluationProfessions = data
        // ,console.log(data)
      },
      error => { console.log(error) }
    )
  }
  onOptionsSelected(ProfessionID: Number) {
   // ProfessionID=this.resultId;
    this.EvaluationProfessionService.GetEvaluationNotByProfessionId(ProfessionID).subscribe(
      res => {
        this.EvaluationProfessions = res
       // ,console.log("ProfessionID in onOptionsSelected ", ProfessionID);
       // ,console.log("GetEvaluationNotByProfession",res);
      },
      err => console.log(err)
    )
  }
  update() {
    this.EvaluationProfessionObj.professionID = Number(this.EvaluationProfessionObj.professionID);
    this.EvaluationProfessionObj.evaluationTypeID = Number(this.EvaluationProfessionObj.evaluationTypeID);
    console.log("data is ",this.EvaluationProfessionObj)
    this.EvaluationProfessionService.EditEvaluationProfession(this.EvaluationProfessionsID, this.EvaluationProfessionObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/EvaluationsProfession']);
      },
      error => console.log(error),
    )
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