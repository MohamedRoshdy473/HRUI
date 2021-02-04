import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingProfessionService } from 'src/app/Services/training-profession.service';
import { TrainingTypeService } from 'src/app/Services/training-type.service';
import { CoursesService } from 'src/app/Services/courses.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { TrainingService } from 'src/app/Services/training.service'
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  TrainingObj: any;
  TrainingList: any;
  courses: any;
  Professions: any;
  TrainingTypes: any;
  Employees: any;
  @ViewChild('dt') table: Table;
  displayBasic: boolean;
  //loading: boolean = true;
  submitted: boolean;
  constructor(private TrainingService: TrainingService, private EmployeeService: EmployeeService, private TrainingProfessionService: TrainingProfessionService, private TraingTypeService: TrainingTypeService
    , private CourseService: CoursesService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.TrainingObj = {
      Id: 0, StartDate: new Date(), EndDate: new Date(), Certified: "", TrainingPlace: "",
      EmployeeID: 0, EmployeeName: "", InstructorID: 0, InstructorName: "", TrainingProfessionID: 0,
      ProfessionID: 0, professionName: "", CourseID: 0, CourseName: "", TrainingTypeID: 0, TrainingTypeName: ""
    }
  }
  ngOnInit(): void {
    this.TrainingService.GetCertified().subscribe(
      (res) => {
        this.TrainingList = res;
      },
      err => console.log(err)
    )
    this.TrainingService.GetPending().subscribe(
      (res) => {
        this.TrainingList = res;
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
    //-------------------------------
    this.CourseService.getAllCourse().subscribe(
      data => {
        this.courses = data

        // ,console.log("courses are : ",data)
      },
      error => { console.log(error) }
    )
    //-------------------------------
    this.TrainingService.GetAllTrainings().subscribe(
      data => {
        this.TrainingList = data

        ,console.log("TrainingList are : ",data)
      },
      error => { console.log(error) }
    )
  }
  CertifiedTrainging(id) {
    this.TrainingService.Certified(id).subscribe(
      res => { console.log(res), this.ngOnInit() },
      error => console.log(error),
    );

  }
  onOptionsSelected(ProfessionID: number) {
    console.log("the EvaluationTypeByProfessionId value is " + ProfessionID);
    // this.TrainingProfessionService.GetTrainingAndCourseByProfessionId(ProfessionID).subscribe(
    //   res => {
    //     // console.log(res);
    //     this.TrainingprofessionList = res
    //   },
    //   err => console.log(err)
    // )
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'type', 'in')
  }

  showBasicDialog(id) {
    this.displayBasic = true;
    console.log(id);
    this.TrainingService.GetTrainingByID(id).subscribe(
      data => {
        this.TrainingObj = data
          
         // ,console.log(data)
      },
      error => { console.log(error) }
    )
  }

  confirm(id) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.TrainingService.DeleteTraining(id).subscribe(
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

