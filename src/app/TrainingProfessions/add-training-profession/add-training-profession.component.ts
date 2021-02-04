import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingProfessionService } from 'src/app/Services/training-profession.service';
import { TrainingTypeService } from 'src/app/Services/training-type.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-add-training-profession',
  templateUrl: './add-training-profession.component.html',
  styleUrls: ['./add-training-profession.component.css']
})
export class AddTrainingProfessionComponent implements OnInit {
  TrainingprofessionObj: any;
  TrainingprofessionList: any;
  courses: any;
  Professions: any;
  TrainingTypes: any;
  constructor(private router: Router, private EmployeeService: EmployeeService, private TrainingProfessionService: TrainingProfessionService, private TraingTypeService: TrainingTypeService
    , private CourseService: CoursesService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.TrainingprofessionObj = { Id: 0, ProfessionID: 0, professionName: "", CourseID: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: "" }

  }

  ngOnInit(): void {
    this.EmployeeService.getProfession().subscribe(
      data => {
        this.Professions = data
          ,
          console.log("Professions are : ", data)
      },
      error => { console.log(error) }
    )

    this.TrainingProfessionService.GetAllTrainingProfessions().subscribe(
      data => {
        this.TrainingprofessionList = data
          ,
          console.log("Trainingprofessions are : ", data)
      },
      error => { console.log(error) }
    )
  }
  onOptionsSelected(ProfessionID: Number) {
    console.log("the TrainingAndCourseNotByProfessionId value is " + ProfessionID);
    this.TrainingProfessionService.GetTrainingAndCourseNotByProfessionId(ProfessionID).subscribe(
      res => {
        console.log("TrainingAndCourseNotByProfessionId",res);
        this.TrainingprofessionObj.trainingTypeID = res["trainingTypeID"];
        this.TrainingTypes = res;
      },
      err => console.log(err)
    )
  }
  onTrainingSelected(trainingTypeID:Number)
  {
    this.CourseService.GetCoursesByTrainingTypeID(trainingTypeID).subscribe(
      res => {
        console.log("CoursesByTrainingTypeID",res);
        this.courses = res
      },
      err => console.log(err)
    )
  }
  AddTrainingprofession() {
    this.TrainingprofessionObj.professionID = Number(this.TrainingprofessionObj.professionID);
    this.TrainingprofessionObj.courseID = Number(this.TrainingprofessionObj.courseID);
    this.TrainingprofessionObj.trainingTypeID = Number(this.TrainingprofessionObj.trainingTypeID);

    this.TrainingProfessionService.AddTrainingProfession(this.TrainingprofessionObj).subscribe(
      (res) => { this.router.navigate(['/TrainingProfessions']); },
      err => console.log(err),
    );
  }
}
