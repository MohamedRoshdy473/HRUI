import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EvaluationTypeService } from 'src/app/Services/evaluation-type.service';
@Component({
  selector: 'app-edit-evaluation-type',
  templateUrl: './edit-evaluation-type.component.html',
  styleUrls: ['./edit-evaluation-type.component.css']
})
export class EditEvaluationTypeComponent implements OnInit {
  EvaluationTypeObj:any;
  constructor(private EvaluationTypeService:EvaluationTypeService, private activeRoute: ActivatedRoute,private router :Router,private confirmationService: ConfirmationService, private messageService: MessageService,public datepipe: DatePipe) { 
    this.EvaluationTypeObj={Id:0,Name:''}
  }
  EvaluationTypeID = this.activeRoute.snapshot.params['id'];
  ngOnInit(): void {
    this.EvaluationTypeService.GetAllEvalutaionTypeByID(this.EvaluationTypeID).subscribe(
      (res)=>{this.EvaluationTypeObj=res,console.log("the name is "+res)},
      err=>console.log(err),
    )
  }
update()
{
  this.EvaluationTypeService.EditEvaluationType(this.EvaluationTypeID, this.EvaluationTypeObj).subscribe(
    res => {
      this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
      this.router.navigate(['/EvaluationType']);
    },
    error => console.log(error),
  )
}
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
}

showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Message Content'});
}

showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
}

showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
}

showTopLeft() {
    this.messageService.add({key: 'tl', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showTopCenter() {
    this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showBottomCenter() {
    this.messageService.add({key: 'bc', severity:'info', summary: 'Info', detail: 'Message Content'});
}

showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

showMultiple() {
    this.messageService.addAll([
        {severity:'info', summary:'Message 1', detail:'Message Content'},
        {severity:'info', summary:'Message 2', detail:'Message Content'},
        {severity:'info', summary:'Message 3', detail:'Message Content'}
    ]);
}

showSticky() {
    this.messageService.add({severity:'info', summary: 'Sticky', detail: 'Message Content', sticky: true});
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

