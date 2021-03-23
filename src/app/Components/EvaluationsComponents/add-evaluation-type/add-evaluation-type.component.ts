import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
@Component({
  selector: 'app-add-evaluation-type',
  templateUrl: './add-evaluation-type.component.html',
  styleUrls: ['./add-evaluation-type.component.css']
})
export class AddEvaluationTypeComponent implements OnInit {
evaluationType:any;
  constructor(private evaluationtypeservice:EvaluationTypeService,private router :Router,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.evaluationType={Id:0,Name:''}

   }

  ngOnInit(): void {
  }
  AddEvaluationType()
  {
    this.evaluationtypeservice.AddEvalutaionType(this.evaluationType).subscribe(
        res=>{this.router.navigate(['/EvaluationType']);},
        err=>console.log(err)
    );
  }
}
