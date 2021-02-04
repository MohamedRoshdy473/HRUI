import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import{EvaluationTypeService}from 'src/app/Services/evaluation-type.service';
import{EvaluationProfessionService}from 'src/app/Services/evaluation-profession.service';
import{EmployeeService}from 'src/app/Services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-evaluation-profession',
  templateUrl: './add-evaluation-profession.component.html',
  styleUrls: ['./add-evaluation-profession.component.css']
})
export class AddEvaluationProfessionComponent implements OnInit {
  EvaluationProfessions: any;
  EvaluationProfessionObj: any;
  Professions: any;
  EvaluationType:any
  ProfessionID:Number;
  EvaluationTypeID:Number;
  constructor(private router:Router,private EvaluationTypeService:EvaluationTypeService,private EvaluationProfessionService:EvaluationProfessionService,private EmployeeService:EmployeeService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.EvaluationProfessionObj={id:0,evaluationTypeID:0,evaluationTypeName:"",professionID:0,professionName:""}
   }

  ngOnInit(): void {
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
          
        //  console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationTypeService.GetAllEvalutaionType().subscribe(
      data => {
        this.EvaluationType = data
          
          //console.log(data)
      },
      error => { console.log(error) }
    )
    this.EvaluationProfessionService.GetEvaluationProfession().subscribe(
      data => {
        this.EvaluationProfessions = data
          
         // console.log(data)
      },
      error => { console.log(error) }
    )
  }
  onOptionsSelected(ProfessionID:Number){
      console.log("the EvaluationTypeByProfessionId value is " + ProfessionID);
      this.EvaluationProfessionService.GetEvaluationNotByProfessionId(ProfessionID).subscribe(
          res=> {
           // console.log(res);
            this.EvaluationType=res     
          },
          err=>console.log(err)
        )
}

typeId:number
onTypeSelected(typeId:number){
  this.typeId = typeId;
  console.log(this.typeId);
}





  AddEvaluationProfession() {
    this.EvaluationProfessionObj.professionID = Number(this.EvaluationProfessionObj.professionID);
    this.EvaluationProfessionObj.evaluationTypeID = Number(this.EvaluationProfessionObj.evaluationTypeID);
  
  
    
    // console.log(this.EvaluationProfessionObj.ProfessionID);
    // console.log(this.EvaluationProfessionObj.evaluationTypeID);
   // console.log("data is ",this.EvaluationProfessionObj)




    this.EvaluationProfessionService.AddEvaluationProfession(this.EvaluationProfessionObj).subscribe(
      (res) => { this.router.navigate(['/EvaluationsProfession']); },
      err => console.log(err),
    );
  }
}
