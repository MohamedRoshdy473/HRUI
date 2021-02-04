import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingProfessionService } from 'src/app/Services/training-profession.service';
import { TrainingTypeService } from 'src/app/Services/training-type.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TrainingService } from 'src/app/Services/training.service';
import { InstructorService } from 'src/app/Services/instructor.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotFoundComponent } from 'src/app/not-found/not-found.component';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit {
  TrainingObj: any;
  TrainingList: any;
  courses: any;
  Professions: any;
  TrainingTypes: any;
  Employees: any;
  Instructors: any;
  message: any;
  TrainingProfession: any;
  lstProfEmployees: any;
  constructor(private instructorService: InstructorService, public dialog: MatDialog, private TrainingService: TrainingService, private EmployeeService: EmployeeService, private TrainingProfessionService: TrainingProfessionService, private TraingTypeService: TrainingTypeService
    , private CourseService: CoursesService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.TrainingObj = {
      id: 0, startDate: new Date(), endDate: new Date(), certified: "Pending", trainingPlace: "",
      employeeID: 0, employeeName: "", instructorID: 0, instructorName: "", trainingProfessionID: 0,
      professionID: 0, professionName: "", courseID: 0, courseName: "", trainingTypeID: 0, trainingTypeName: ""
    }
    this.message = "not found";
  }
  openDialog() {
    this.dialog.open(AddTrainingComponent);
  }
  ngOnInit(): void {
    this.instructorService.GetAllInstructors().subscribe(
      (res) => {
        this.Instructors = res;
      },
      err => console.log(err)
    )
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
      },
      error => { console.log(error) }
    )
  }

  onProfessionSelected($event) {
    this.EmployeeService.GetAllEmployeesByProfession($event.target.value).subscribe(
      data => {
        this.lstProfEmployees = data;
      },
      error => { console.log(error) 
      }
    )
    this.TrainingObj.professionID = $event.target.value;
    console.log("this.TrainingObj.professionID",this.TrainingObj.professionID)
    this.TrainingService.GetTrainingTypesByprofessionID($event.target.value).subscribe(
      data => {
        this.TrainingProfession = data;
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

  AddTraining() {
    console.log("TrainingObj", this.TrainingObj)
    this.TrainingObj.instructorID = Number(this.TrainingObj.instructorID);
    this.TrainingObj.professionID = Number(this.TrainingObj.professionID);
    this.TrainingObj.employeeID = Number(this.TrainingObj.employeeID);
    this.TrainingObj.courseID = Number(this.TrainingObj.courseID);
    this.TrainingObj.trainingTypeID = Number(this.TrainingObj.trainingTypeID);
    this.TrainingObj.certified = "Pending";

    this.TrainingService.AddTraining(this.TrainingObj).subscribe(
      (res) => { this.router.navigate(['/Trainings']); },
      err => console.log(err),
    );
  }
}



