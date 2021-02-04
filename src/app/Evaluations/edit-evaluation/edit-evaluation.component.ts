import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
import { EvaluationProfessionService } from 'src/app/Services/evaluation-profession.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EvaluationService } from 'src/app/Services/evaluation.service';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.css'],
  providers: [DatePipe]

})
export class EditEvaluationComponent implements OnInit {
  @Input('rating') public rating: number = 1;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();
  public snackBarDuration: number = 2000;
  public ratingArr = [];
  EvaluationObj: any;
  EvaluationList: any;
  EvaluationProfessionObj: any;
  Professions: any;
  ProfessionsEmployee:any;
  Employees: any;
  EvaluationType: any
  evaluationDegreee: Number;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  constructor(public datepipe: DatePipe,private EvaluationTypeService: EvaluationTypeService,private snackBar: MatSnackBar,
    private EvaluationService: EvaluationService,
    private EvaluationProfessionService: EvaluationProfessionService,
    private EmployeeService: EmployeeService, private confirmationService: ConfirmationService, private activeRoute: ActivatedRoute,
    private router: Router, private messageService: MessageService) { 
      this.EvaluationObj = {
        id: 0, employeeID: 0, employeeName: "", evaluationProfessionID: 0, evaluationTypeName: ""
        , professionName: "", professionID: 0, evaluationDegreee: 0, evaluationDate: new Date(), note: ""
      }
    }
    EvaluationID = this.activeRoute.snapshot.params['id'];

  ngOnInit(): void {

    console.log("starCount "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

this.EvaluationService.GetEvaluationID(this.EvaluationID).subscribe(
  data => {
    this.EvaluationObj = data,
    this.EvaluationService.GetEvaluationObjByEmployeeID(this.EvaluationObj.employeeID).subscribe(
      result => {
        //console.log(" data is : ", res["professionID"]);
       this.EvaluationObj.professionID = result["professionID"];
       // console.log(this.EvaluationObj);
        this.ProfessionsEmployee = result;
        this.EvaluationProfessionService.GetEvaluationTypeByProfessionId(Number(result["professionID"]))
        .subscribe(
          res=> {
          // console.log(res);
            this.EvaluationType=res     
          },
          err=>console.log(err)
        )
      },
      err => console.log(err)
    )
    , console.log("EvaluationObj is : ",this.EvaluationObj)
  },
  error => { console.log(error) }
)

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
        this.Professions = data;
        console.log("data Professions"+data);
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
  
  onClick(rating:number) {
   // console.log(rating)
    // this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
    //   duration: this.snackBarDuration
    // });
    this.ratingUpdated.emit(rating);
    this.EvaluationObj.evaluationDegreee=rating;
    console.log("rating " ,this.EvaluationObj.evaluationDegreee)
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }


  onOptionsSelected(employeeID: number) {
    // console.log("the employeeID value is " + employeeID);
     this.EvaluationService.GetEvaluationObjByEmployeeID(employeeID).subscribe(
       res => {
         //console.log(" data is : ", res["professionID"]);
        this.EvaluationObj.professionID = res["professionID"];
        // console.log(this.EvaluationObj);
         this.Professions = res;
         this.EvaluationProfessionService.GetEvaluationTypeByProfessionId(Number(res["professionID"]))
         .subscribe(
           res=> {
           // console.log(res);
             this.EvaluationType=res     
           },
           err=>console.log(err)
         )
 
 
       },
       err => console.log(err)
     )
   }
   onTypeSelected(professionID: number) {
     this.EvaluationProfessionService.GetEvaluationTypeByProfessionId(professionID).subscribe(
       res => {
         //console.log(res);
         this.EvaluationType = res
       },
       err => console.log(err)
     )
   }

  update() {
    this.EvaluationObj.professionID = Number(this.EvaluationObj.professionID);
    this.EvaluationObj.employeeID = Number(this.EvaluationObj.employeeID);
    this.EvaluationObj.evaluationTypeID = Number(this.EvaluationObj.evaluationTypeID);
    this.EvaluationObj.evaluationProfessionID = Number(this.EvaluationObj.evaluationProfessionID);
    this.EvaluationObj.evaluationDegreee=Number(this.EvaluationObj.evaluationDegreee);
    this.EvaluationObj.evaluationDate = this.evalDate;

    console.log("data is ",this.EvaluationObj)
    this.EvaluationService.EditEvaluation(this.EvaluationID, this.EvaluationObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/Evaluations']);
      },
      error => console.log(error),
    )
  }

  evalDate:string
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.evalDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    console.log(this.evalDate)
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