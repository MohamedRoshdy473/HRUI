import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/Services/courses.service';
import{TrainingTypeService} from 'src/app/Services/training-type.service'

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseObj: any;
  coursesList: any;
  TrainingTypesList; any;
  constructor(private coursesService: CoursesService, private TrainingTypeService: TrainingTypeService
    , private confirmationService: ConfirmationService, private messageService: MessageService,private router:Router) {
    this.courseObj = { Id: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: "" }
  }

  ngOnInit(): void {
    this.TrainingTypeService.GetAllTrainingTypes().subscribe(
      (data) => {
        this.TrainingTypesList = data;
        console.log(data);
      })
  }
  addCourse()
  {
    this.courseObj.trainingTypeID=Number(this.courseObj.trainingTypeID);
    this.coursesService.addCourse(this.courseObj).subscribe(
      res=>{this.router.navigate(['/Courses']);},
      err=>console.log(err),
    )
  }
}
