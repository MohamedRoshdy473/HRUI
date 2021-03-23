import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import{TrainingTypeService} from 'src/app/Services/training-type.service'

@Component({
  selector: 'app-edit-training-type',
  templateUrl: './edit-training-type.component.html',
  styleUrls: ['./edit-training-type.component.css']
})
export class EditTrainingTypeComponent implements OnInit {
  TrainingTypeObj:any;
  TrainingTypesList:any;
  constructor(private TrainingTypeService:TrainingTypeService,private activeRoute: ActivatedRoute,private router :Router,private confirmationService: ConfirmationService, private messageService: MessageService,public datepipe: DatePipe) { 
    this.TrainingTypeObj={Id:0,TrainingTypeName:""}
  }
  TrainingTypeID = this.activeRoute.snapshot.params['id'];
  ngOnInit(): void {
    this.TrainingTypeService.GetTrainingTypeByID(this.TrainingTypeID).subscribe(
      (res)=>{this.TrainingTypeObj=res,
        console.log("the name is "+res)},
      err=>console.log(err),
    )
  }
  update()
  {
    this.TrainingTypeService.EditTrainingType(this.TrainingTypeID, this.TrainingTypeObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/TrainingTypes']);
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
  
  