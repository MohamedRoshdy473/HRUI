import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import{TrainingTypeService} from 'src/app/Services/training-type.service'
@Component({
  selector: 'app-training-type',
  templateUrl: './training-type.component.html',
  styleUrls: ['./training-type.component.css']
})
export class TrainingTypeComponent implements OnInit {
  loading: boolean = true;
  displayBasic: boolean;
  @ViewChild('dt') table: Table;
  TrainingTypeObj:any;
  TrainingTypesList:any;
  constructor(private TrainingTypeService:TrainingTypeService,private confirmationService: ConfirmationService, private messageService: MessageService) { 
    this.TrainingTypeObj={Id:0,TrainingTypeName:""}
  }

  ngOnInit(): void {
    this.TrainingTypeService.GetAllTrainingTypes().subscribe(
      (data)=>{
          this.TrainingTypesList=data,
          console.log(data)
      },
      (err)=>{console.log(err)}
  )
  this.loading = false;
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    this.TrainingTypeService.GetTrainingTypeByID(id).subscribe(
        data=>{
          this.TrainingTypeObj=data,
          console.log(data)},
        error=>{console.log(error)}
    )
}

confirm(id) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            this.TrainingTypeService.DeleteTrainingType(id).subscribe(
              data=>{
                this.ngOnInit(),
                this.messageService.add({severity:'info', summary:'Record Deleted!', detail:'Record Deleted!'});
              }
            )
        }
    });
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
