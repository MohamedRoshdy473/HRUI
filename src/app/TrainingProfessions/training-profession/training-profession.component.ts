import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingProfessionService } from 'src/app/Services/training-profession.service';
import { TrainingTypeService } from 'src/app/Services/training-type.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EmployeeService } from 'src/app/Services/employee.service';


@Component({
  selector: 'app-training-profession',
  templateUrl: './training-profession.component.html',
  styleUrls: ['./training-profession.component.css']
})
export class TrainingProfessionComponent implements OnInit {
  TrainingprofessionObj: any;
  TrainingprofessionList: any;
  courses: any;
  Professions:any;
  TrainingTypes: any;
  @ViewChild('dt') table: Table;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  name:any;
  constructor(private EmployeeService: EmployeeService, private TrainingProfessionService: TrainingProfessionService, private TraingTypeService: TrainingTypeService
    , private CourseService: CoursesService, private confirmationService: ConfirmationService, private messageService: MessageService)
     {
    this.TrainingprofessionObj = { Id: 0, ProfessionID: 0, ProfessionName: "", CourseID: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: "" }
  }

  ngOnInit(): void {

    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
         
          // ,console.log("Professions are : ",data)
      },
      error => { console.log(error) }
    )
    //-------------------------------
    this.TraingTypeService.GetAllTrainingTypes().subscribe(
      data => {
        this.TrainingTypes = data
          
         // ,console.log("TrainingTypes are : ",data)
      },
      error => { console.log(error) }
    )
    //-------------------------------
    this.CourseService.getAllCourse().subscribe(
      data => {
        this.courses = data
         
          // ,console.log("courses are : ",data)
      },
      error => { console.log(error) }
    )
    //-------------------------------
    this.TrainingProfessionService.GetAllTrainingProfessions().subscribe(
      data => {
        this.TrainingprofessionList = data
          
          //,console.log("Trainingprofessions are : ",data)
      },
      error => { console.log(error) }
    )
  }

  onOptionsSelected(ProfessionID:number){
      console.log("the EvaluationTypeByProfessionId value is " + ProfessionID);
      this.TrainingProfessionService.GetTrainingAndCourseByProfessionId(ProfessionID).subscribe(
          res=> {
           // console.log(res);
            this.TrainingprofessionList=res     
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
   
    this.TrainingProfessionService.GetTrainingProfessionByID(id).subscribe(
      data => { 
        // this.name=data["professionName"];
        // console.log(this.name);
        this.TrainingprofessionObj = data       
          , console.log("Trainingprofession is : ", data)
      },
      error => { console.log(error) }
    )
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.TrainingProfessionService.DeleteTrainingProfession(id).subscribe(
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
