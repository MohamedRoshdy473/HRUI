import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CoursesService } from 'src/app/Services/courses.service';
import{TrainingTypeService}  from 'src/app/Services/training-type.service'

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseObj: any;
  coursesList: any;
  TrainingTypesList; any;
  constructor(private coursesService: CoursesService, private TrainingTypeService: TrainingTypeService
    , private confirmationService: ConfirmationService, private messageService: MessageService,
     private activeRoute: ActivatedRoute, public datepipe: DatePipe,private router:Router) {
      this.courseObj = { Id: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: "" }
     }
     CourseID =this.activeRoute.snapshot.params['id'];
  ngOnInit(): void {

    this.TrainingTypeService.GetAllTrainingTypes().subscribe(
      (data) => {
        this.TrainingTypesList = data;
        console.log(data);
      })

      this.coursesService.getCourseByID(this.CourseID).subscribe(
        (data) => {
          this.courseObj = data;
          console.log(data);
        })
  }
  onOptionsSelected(TrainingTypeID: number) {
    console.log("the selected value is " + TrainingTypeID);
    this.coursesService.GetCoursesByTrainingTypeID(TrainingTypeID).subscribe(
      res => {
        console.log(res);
        this.coursesList = res
      },
      err => console.log(err)
    )
  }

  update() {
    this.courseObj.trainingTypeID=Number(this.courseObj.trainingTypeID);
    this.coursesService.editCourse(this.CourseID,this.courseObj).subscribe(
      res => {
        console.log(res);
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/Courses']);
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

