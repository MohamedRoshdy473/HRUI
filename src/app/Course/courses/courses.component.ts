import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingTypeService } from 'src/app/Services/training-type.service';
import { CoursesService } from 'src/app/Services/courses.service'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courseObj: any;
  coursesList: any;
  TrainingTypesList; any;
  displayBasic: boolean;
  loading: boolean = true;
  submitted: boolean;
  @ViewChild('dt') table: Table;
  constructor(private coursesService: CoursesService, private TrainingTypeService: TrainingTypeService
    , private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.courseObj = { Id: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: "" }
  }

  ngOnInit(): void {
    this.coursesService.getAllCourse().subscribe(
      (data) => {
        this.coursesList = data;
        //console.log(data);
        this.loading = false;
      })
    this.TrainingTypeService.GetAllTrainingTypes().subscribe(
      (data) => {
        this.TrainingTypesList = data;
        //console.log(data);
        this.loading = false;
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
  onRepresentativeChange(event) {
    this.table.filter(event.value, 'type', 'in')
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    console.log(id);
    this.coursesService.getCourseByID(id).subscribe(
      data => {
        this.courseObj = data
          ,console.log("CourseByID : ",data)
      },
      error => { console.log(error) }
    )
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.coursesService.deleteCourse(id).subscribe(
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

