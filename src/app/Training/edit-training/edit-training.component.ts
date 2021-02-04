import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { TrainingProfessionService } from 'src/app/Services/training-profession.service';
import { TrainingTypeService } from 'src/app/Services/training-type.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TrainingService } from 'src/app/Services/training.service'
import { Table } from 'primeng/table';
import { InstructorService } from 'src/app/Services/instructor.service';
@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css']
})
export class EditTrainingComponent implements OnInit {
  TrainingObj: any;
  TrainingList: any;
  courses: any;
  Professions: any;
  TrainingTypes: any;
  Employees: any;
  Instructors:any;
  TrainingProfession:any;
  @ViewChild('dt') table: Table;
  constructor(private instructorService:InstructorService,private activeRoute: ActivatedRoute,private router:Router,public datepipe: DatePipe, private TrainingService: TrainingService, private EmployeeService: EmployeeService, private TrainingProfessionService: TrainingProfessionService, private TraingTypeService: TrainingTypeService
    , private CourseService: CoursesService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.TrainingObj = {
      Id: 0, StartDate: new Date(), EndDate: new Date(), Certified: "", TrainingPlace: "",
      EmployeeID: 0, EmployeeName: "", InstructorID: 0, InstructorName: "", TrainingProfessionID: 0,
      ProfessionID: 0, professionName: "", CourseID: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: ""
    }
  }
  TrainingID = this.activeRoute.snapshot.params['id'];

  ngOnInit(): void {
    this.TrainingService.GetTrainingByID(this.TrainingID).subscribe(
      (res) => {
        this.TrainingObj = res;
        console.log("TrainingObj",this.TrainingObj)
      },
      err => console.log(err)
    )
    this.instructorService.GetAllInstructors().subscribe(
      (res) => {
        this.Instructors = res;
      },
      err => console.log(err)
    )
    this.EmployeeService.GetAllEmployees().subscribe(
      (res) => {
        this.Employees = res;
      },
      err => console.log(err)
    )
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

    this.CourseService.getAllCourse().subscribe(
      data => {
        this.courses = data

        // ,console.log("courses are : ",data)
      },
      error => { console.log(error) }
    )

  }
  onProfessionSelected($event) {
    this.EmployeeService.GetAllEmployeesByProfession($event.target.value).subscribe(
      data => {
        this.Employees = data;
      },
      error => { console.log(error) 
      }
    )
    this.TrainingObj.professionID = $event.target.value;
    console.log("this.TrainingObj.professionID",this.TrainingObj.professionID)
    this.TrainingService.GetTrainingTypesByprofessionID($event.target.value).subscribe(
      data => {
        this.courses = data;
      },
      error => { console.log(error) }
    )

  }

  onTrainingSelected($event) {
    console.log("Training Type Id : ", $event.target.value);

    this.TrainingService.GetCoursesByTrainingTypeID($event.target.value).subscribe(data => {
      this.courses = data;
      console.log("courses",data)
    },
      error => { console.log(error) }
    )
    this.TrainingObj.trainingTypeID = $event.target.value;
    console.log("TrainingObj.trainingTypeID" ,this.TrainingObj.trainingTypeID)

  }
  onCourseSelected($event) {
    console.log("Course Id : ", $event.target.value);
    this.TrainingObj.courseID = $event.target.value;

  }
  onEmployeeSelected($event) {
    this.TrainingObj.employeeID = $event.target.value;
    console.log("employeeID Id : ", $event.target.value);
  }

  update() {
    console.log("TrainingObj", this.TrainingObj)
    this.TrainingObj.instructorID = Number(this.TrainingObj.instructorID);
    this.TrainingObj.professionID = Number(this.TrainingObj.professionID);
    this.TrainingObj.employeeID = Number(this.TrainingObj.employeeID);
    this.TrainingObj.courseID = Number(this.TrainingObj.courseID);
    this.TrainingObj.trainingTypeID = Number(this.TrainingObj.trainingTypeID);
    this.TrainingObj.startDate = this.startTrainDate;
    this.TrainingObj.endDate = this.endTrainDate;


    console.log("data is ", this.TrainingObj)
    this.TrainingService.EditTraining(this.TrainingID, this.TrainingObj).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/Trainings']);
      },
      error => console.log(error),
    )
  }

  startTrainDate: string;
  endTrainDate: string
  addEvent(type: string, event: MatDatepickerInputEvent<Date>)
   {
    this.startTrainDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.endTrainDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    //console.log(this.startTrainDate)
  }
  addEventEndDate(type: string, event2: MatDatepickerInputEvent<Date>)
   {
    //this.startTrainDate = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    this.endTrainDate = this.datepipe.transform(event2.value, 'yyyy-MM-dd');
    //console.log(this.startTrainDate)
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
