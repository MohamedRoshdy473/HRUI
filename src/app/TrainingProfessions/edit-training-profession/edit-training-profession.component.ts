import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/Services/courses.service';
import{TrainingProfessionService} from 'src/app/Services/training-profession.service';
import{EmployeeService} from 'src/app/Services/employee.service';
import{TrainingTypeService} from 'src/app/Services/training-type.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-training-profession',
  templateUrl: './edit-training-profession.component.html',
  styleUrls: ['./edit-training-profession.component.css']
})
export class EditTrainingProfessionComponent implements OnInit {
  TrainingprofessionObj: any;
  TrainingprofessionList: any;
  courses: any;
  Professions: any;
  TrainingTypes: any;
  TrainingprofessionID = this.activeRoute.snapshot.params['id'];

  constructor(private activeRoute:ActivatedRoute,private router: Router, private EmployeeService: EmployeeService, private TrainingProfessionService: TrainingProfessionService, private TraingTypeService: TrainingTypeService
    , private CourseService: CoursesService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.TrainingprofessionObj = { Id: 0, ProfessionID: 0, professionName: "", CourseID: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: "" }
  }
  ngOnInit(): void {
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
         // ,console.log("Professions are : ", data)       
      },
      error => { console.log(error) }
    )
    
    this.TrainingProfessionService.GetTrainingProfessionByID(this.TrainingprofessionID).subscribe(
      data => {
        this.TrainingprofessionObj = data
         
          , console.log("Trainingprofession before update is : ", data)
      },
      error => { console.log(error) }
    )
    this.TraingTypeService.GetAllTrainingTypes().subscribe(
      data => {
        this.TrainingTypes = data
          
         //, console.log("TrainingTypes are : ",data)
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
    // this.TrainingProfessionService.GetAllTrainingProfessions().subscribe(
    //   data => {
    //     this.TrainingprofessionList = data
         
    //      // , console.log("Trainingprofessions are : ",data)
    //   },
    //   error => { console.log(error) }
    // )
  }
  onOptionsSelected(ProfessionID: Number) {
    console.log("the TrainingAndCourseNotByProfessionId value is " + ProfessionID);
    this.TrainingProfessionService.GetTrainingAndCourseNotByProfessionId(ProfessionID).subscribe(
      res => {
        console.log("TrainingAndCourseNotByProfessionId",res);
        this.TrainingprofessionObj.trainingTypeID = res["trainingTypeID"];
        this.CourseService.GetCoursesByTrainingTypeID(this.TrainingprofessionObj.trainingTypeID).subscribe(
          res => {
            //console.log("CoursesByTrainingTypeID",res);
            this.courses = res
          },
          err => console.log(err)
        )
        this.TrainingTypes = res;
        
      },
      err => console.log(err)
    )
  }
  onTrainingSelected(trainingTypeID:Number)
  {
    this.CourseService.GetCoursesByTrainingTypeID(trainingTypeID).subscribe(
      res => {
       // console.log("CoursesByTrainingTypeID",res);
        this.courses = res
      },
      err => console.log(err)
    )
  }
  onCourseSelected($event)
  {
    console.log("$event.target.value",$event.target.value);
    this.TrainingprofessionObj.courseID = $event.target.value;
  }
  update() {
    this.TrainingprofessionObj.professionID = Number(this.TrainingprofessionObj.professionID);
    this.TrainingprofessionObj.trainingTypeID = Number(this.TrainingprofessionObj.trainingTypeID);
    this.TrainingprofessionObj.courseID = Number(this.TrainingprofessionObj.courseID);
    // console.log("this.TrainingprofessionObj.professionID",this.TrainingprofessionObj.professionID);
    // console.log("this.TrainingprofessionObj.trainingTypeID ",this.TrainingprofessionObj.trainingTypeID );
    // console.log("this.TrainingprofessionObj.courseID",this.TrainingprofessionObj.courseID);
    this.TrainingProfessionService.EditTrainingProfession(this.TrainingprofessionID, this.TrainingprofessionObj).subscribe(
      res => {
        console.log("updated date ",this.TrainingprofessionObj);
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/TrainingProfessions']);
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
