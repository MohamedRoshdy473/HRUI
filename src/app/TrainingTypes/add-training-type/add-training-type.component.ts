import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import{TrainingTypeService} from 'src/app/Services/training-type.service'
@Component({
  selector: 'app-add-training-type',
  templateUrl: './add-training-type.component.html',
  styleUrls: ['./add-training-type.component.css']
})
export class AddTrainingTypeComponent implements OnInit {
  TrainingTypeObj:any;
  TrainingTypesList:any;
  constructor(private TrainingTypeService:TrainingTypeService,private router :Router,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.TrainingTypeObj={Id:0,TrainingTypeName:""}
   }

  ngOnInit(): void {
  }
  AddTrainingType()
  {
    this.TrainingTypeService.AddTrainingType(this.TrainingTypeObj).subscribe(
        res=>{this.router.navigate(['/TrainingTypes']);},
        err=>console.log(err)
    );
  }
}
