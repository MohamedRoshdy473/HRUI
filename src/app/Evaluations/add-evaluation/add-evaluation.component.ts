import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
import { EvaluationProfessionService } from 'src/app/Services/evaluation-profession.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { EvaluationService } from 'src/app/Services/evaluation.service';
import { RatingModule } from 'primeng/rating';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']

})
export class AddEvaluationComponent implements OnInit {
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
  //evaluationDegreee: Number;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  constructor(private EvaluationTypeService: EvaluationTypeService,private snackBar: MatSnackBar,
    private EvaluationService: EvaluationService,
    private EvaluationProfessionService: EvaluationProfessionService,
    private EmployeeService: EmployeeService, private confirmationService: ConfirmationService,
    private router: Router, private messageService: MessageService) {
    this.EvaluationObj = {
      id: 0, employeeID: 0, employeeName: "", evaluationProfessionID: 0, evaluationTypeName: ""
      , professionName: "", professionID: 0, evaluationDegreee: 0, evaluationDate: new Date(), note: ""
    }
  }

  ngOnInit(): void {
    // console.log("starCount "+this.starCount)
    // for (let index = 0; index < this.starCount; index++) {
    //   this.ratingArr.push(index);
    // }


    // this.EvaluationService.GetAllEvaluations().subscribe(
    //   data => {
    //     this.EvaluationList = data
    //     //, console.log(data)
    //   },
    //   error => { console.log(error) }
    // )
    this.EmployeeService.GetAllEmployees().subscribe(
      data => {
        this.Employees = data
        //, console.log(data)
      },
      error => { console.log(error) }
    )
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.ProfessionsEmployee = data;
       // console.log("data Professions"+data);
      },
      error => { console.log(error) }
    )
    // this.EvaluationTypeService.GetAllEvalutaionType().subscribe(
    //   data => {
    //     this.EvaluationType = data
    //     //,console.log(data)
    //   },
    //   error => { console.log(error) }
    // )
    this.EvaluationProfessionService.GetEvaluationProfession().subscribe(
      data => {
        this.EvaluationProfessionObj = data
        // ,console.log(data)
      },
      error => { console.log(error) }
    )
  }

  // onClick(rating:number) {
  //   console.log(rating)
  //   // this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
  //   //   duration: this.snackBarDuration
  //   // });
  //   this.ratingUpdated.emit(rating);
  //   this.EvaluationObj.evaluationDegreee=rating;
  //   console.log("rating " ,this.EvaluationObj.evaluationDegreee)
  //   return false;
  // }

  // showIcon(index:number) {
  //   if (this.rating >= index + 1) {
  //     return 'star';
  //   } else {
  //     return 'star_border';
  //   }
  // }
  onOptionsSelected(employeeID: number) {
   // console.log("the employeeID value is " + employeeID);
    this.EvaluationService.GetEvaluationObjByEmployeeID(employeeID).subscribe(
      res => {
        //console.log(" data is : ", res["professionID"]);
       this.EvaluationObj.professionID = res["professionID"];
       // console.log(this.EvaluationObj);
        this.Professions = res;
//debugger;
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
  AddEvaluation() {
    this.EvaluationObj.professionID = Number(this.EvaluationObj.professionID);
    this.EvaluationObj.employeeID = Number(this.EvaluationObj.employeeID);
    this.EvaluationObj.evaluationTypeID = Number(this.EvaluationObj.evaluationTypeID);
    this.EvaluationObj.evaluationProfessionID = Number(this.EvaluationObj.evaluationProfessionID);
    this.EvaluationObj.evaluationDegreee=Number(this.EvaluationObj.evaluationDegreee);
    console.log("EvaluationObj evaluationDegreee : ",this.EvaluationObj);
    this.EvaluationService.AddEvalutaion(this.EvaluationObj).subscribe(
      (res) => { this.router.navigate(['/Evaluations']); 
         console.log("EvaluationObj added evaluationDegreee : ",this.EvaluationObj);
    },
      err => console.log(err),
    );
  }
}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
