import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from 'src/app/Data_Types/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PositionLevelService } from 'src/app/Services/position-level.service';
import { PositionsService } from 'src/app/Services/positions.service';
import { UniversitiesService } from 'src/app/Services/universities.service';
import { EmployeeDocumentsService } from 'src/app/Services/employee-documents.service';
import { FacultyDepartmentService } from 'src/app/Services/faculty-department.service';
import { FacultyService } from 'src/app/Services/faculty.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EmployeeDocuments } from 'src/app/Data_Types/EmployeeDocuments';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  providers: [DatePipe],

})
export class EditEmployeeComponent implements OnInit {
  title = 'FormValidation';
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  NationalIdPatern = "^[0-9]{14}$";
  phonePatern = "^((\\+91-?)|0)?[0-9]{9}$";
  isValidFormSubmitted = false;
  Employee: Employee;
  profession: any;
  positionLevellst: any;
  Positions: any;
  Universities: any;
  Faculties: any;
  FacultyDepartments: any;
  empImage: EmployeeDocuments
  lstemployeeImages: EmployeeDocuments[]
  lstoddocproj: EmployeeDocuments[]
  selectedFile: any;
  fileToUpload: File;
  uploadedFiles: any[] = [];
  showAlert: boolean = true
  displaydoc: boolean
  options: FormGroup;
  employeeId: any;
  
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;
  hiringdate:any;
  bithdate: Date;
  year:any;
  month :any;
  day :any;
  maxDate:any;
  //docEmployee: EmployeeDocuments
  lstTest: any[] = []
  EmployeeID = this.activeRoute.snapshot.params['empId'];

  constructor(private empService: EmployeeService, private router: Router, private fb: FormBuilder
    , private activeRoute: ActivatedRoute, public datepipe: DatePipe,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private positionLevelService: PositionLevelService, private positionsService: PositionsService,
    private univertyService: UniversitiesService, private FacultyService: FacultyService,
    private employeeDocumentservice: EmployeeDocumentsService,private datePipe: DatePipe,
    private facultyDepartmentService: FacultyDepartmentService, private httpClient: HttpClient,

  ) {
    this.Employee = {
      address: '', email: '', graduatioYear: '',nationalId:'',mobile:'',dateOfBirth:'',emailCompany:'',facultyDepartmentName:''
      , maritalStatus: 'Marital Status', name: '',facultyId:0,facultyName:'',hiringDateHiringDate:'',id:0,positionLevelName:'',positionName:'',
      phone: '', professionID: 0, relevantPhone: '', photo: 'dummyPerson.png', code: '', gender: 'Gender', positionId: 0,universityId:0,universityName:'',listOfdocuments:[],
      positionlevelId: 0, facultyDepartmentId: 0
    };

    this.options = this.fb.group({
      hideRequired: false,
      floatLabel: 'always',
    });

  }
  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    form.resetForm();
  }
  ngOnInit(): void {
    this.hiringdate = new Date();
    this.bithdate = new Date();
    this.year = this.bithdate.getFullYear();
    this.month = this.bithdate.getMonth();
    this.day = this.bithdate.getDay();
    this.maxDate=(this.year-16)+"/"+(this.month)+"/"+this.day
    console.log("maxDate",this.maxDate);


    this.lstemployeeImages = []
    this.lstoddocproj = []
    this.empImage = {
      documentName: '', employeeID: 0, employeeName: '', fileName: '', id: 0
    }
    this.employeeDocumentservice.GetEmployeeDocmentsByEmployeeId(this.EmployeeID).subscribe(d => {
      this.Employee.listOfdocuments = d;
      this.lstTest = d
      console.log("this.employeeId", this.EmployeeID)
      console.log("docs", this.Employee.listOfdocuments)
      // this.project1.listOfdocuments = this.documents;
      //  this.projectObj.listOfdocuments = d;
      // console.log("doc", d)
    }), err => console.log(err)


    console.log(this.EmployeeID);
    this.empImage.employeeID = Number(this.EmployeeID)

    this.empService.getProfession().subscribe(
      (res) => {
        this.profession = res;
        console.log("profession", this.profession)
      },
      (err) => { console.log(err) }
    );
    this.empService.GetEmployee(this.EmployeeID).subscribe(
      (res) => {
        this.Employee = res;
        console.log(this.Employee);
      },
      (err) => { console.log(err) }
    );

    this.positionLevelService.getAllPositionLevel().subscribe(
      res => { this.positionLevellst = res; console.log("levels", this.positionLevellst) },
      err => console.log(err)
    )
    this.positionsService.getAllPosition().subscribe(
      res => { this.Positions = res; console.log("Positions", this.Positions) },
      err => console.log(err)
    )
    this.univertyService.getAllUniversities().subscribe(
      res => { this.Universities = res; console.log("Universities", this.Universities) },
      err => console.log(err)
    )
    this.FacultyService.getAllFaculties().subscribe(
      res => { this.Faculties = res; console.log("Faculties", this.Faculties) },
      err => console.log(err)
    )
    this.facultyDepartmentService.getAllFacultyDepartments().subscribe(
      res => { this.FacultyDepartments = res; console.log("FacultyDepartments", this.FacultyDepartments) },
      err => console.log(err)
    )
  }
  onchangeUniversity($event) {
    console.log("uni", $event.target.value)
    this.FacultyService.GetFacultiesByUniversityId($event.target.value).subscribe(
      res => { this.Faculties = res; console.log("Faculties", this.Faculties) },
      err => console.log(err)
    )
  }
  onchangeFaculty($event) {
    this.facultyDepartmentService.GetFacultyDepartmentsByFacultyId($event.target.value).subscribe(
      res => { this.FacultyDepartments = res; console.log("FacultyDepartments", this.FacultyDepartments) },
      err => console.log(err)
    )
  }
  update() {
    console.log(this.Employee);
    this.Employee.graduatioYear = String(this.Employee.graduatioYear);
    this.Employee.professionID = Number(this.Employee.professionID);
    // this.Employee.dateOfBirth = this.dateOfBirth;
    // this.Employee.hiringDateHiringDate = this.hiringDateHiringDate;

    this.Employee.nationalId = String(this.Employee.nationalId);
    this.Employee.phone = String(this.Employee.phone)
    this.Employee.mobile = String(this.Employee.mobile)
    this.Employee.relevantPhone = String(this.Employee.relevantPhone)

    this.Employee.positionId = Number(this.Employee.positionId);
    this.Employee.positionlevelId = Number(this.Employee.positionlevelId);
    this.Employee.facultyDepartmentId = Number(this.Employee.facultyDepartmentId);

    console.log(this.Employee.professionID)
    console.log(typeof (this.Employee.professionID))
    this.Employee.dateOfBirth = this.datePipe.transform(this.dateOfB, "dd-MM-yyyy");
    this.Employee.hiringDateHiringDate = this.datePipe.transform(this.hiringD, "dd-MM-yyyy")
   // this.isValidDate = this.validateDates(this.Employee.dateOfBirth, this.Employee.hiringDateHiringDate);
   // if (this.isValidDate) {
    this.empService.UpdateEmployee(this.EmployeeID, this.Employee).subscribe(
      res => {
        this.messageService.add({ severity: 'info', summary: 'Record Updated!', detail: 'Record Updated!' });
        this.router.navigate(['/employee']);
      },
      error => console.log(error),
    );
  //}
}

  validateDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate == null || eDate == null)) {
      this.error = { isError: true, errorMessage: 'Start date and end date are required.' };
      this.isValidDate = false;
    }

    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      this.error = { isError: true, errorMessage: 'End date should be grater then start date.' };
      this.isValidDate = false;
    }
    return this.isValidDate;
  }
  comparedate() {
    this.isValidDate = true;
    this.isValidDate = this.validateDates(this.Employee.dateOfBirth, this.Employee.hiringDateHiringDate);
    if (!this.isValidDate) {
      this.error = { isError: true, errorMessage: 'End date should be grater then start date.' };
    }
    if (this.isValidDate) {
      this.error = { isError: true, errorMessage: '' };
    }
    return this.isValidDate;
  }

  onFileSelected(files: FileList) {

    this.fileToUpload = files.item(0);
    const oldName = this.fileToUpload.name;
    const fileExtension = oldName.slice(oldName.lastIndexOf('.') - oldName.length);
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    const newName = this.makeRandom(lengthOfCode, possible);

    console.log(this.fileToUpload.name);
    Object.defineProperty(this.fileToUpload, 'name', {
      writable: true,
      value: newName + fileExtension
    });
    console.log(this.fileToUpload.name);

    this.Employee.photo = this.fileToUpload.name;
    //alert(this.prd.Img);

    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.empService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      //c(data);
    }, error => {
      console.log(error);
    });
  }
  makeRandom(lengthOfCode, possible) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
  }
  closeAlert() {
    //this.alert.nativeElement.classList.remove('show');
    this.showAlert = false
  }


  SaveimageToDB() {

    this.employeeDocumentservice.AddEmployeeDocument(this.lstemployeeImages).subscribe(e => {
      console.log(e)
      this.Employee = {
        address: '', email: '', graduatioYear: '',nationalId:'',mobile:'',dateOfBirth:'',emailCompany:'',facultyDepartmentName:''
        , maritalStatus: 'Marital Status', name: '',facultyId:0,facultyName:'',hiringDateHiringDate:'',id:0,positionLevelName:'',positionName:'',
        phone: '', professionID: 0, relevantPhone: '', photo: 'dummyPerson.png', code: '', gender: 'Gender', positionId: 0,universityId:0,universityName:'',listOfdocuments:[],
        positionlevelId: 0, facultyDepartmentId: 0
      };
  
  
      this.router.navigate(['/employee'])
    })

  }

  dateOfB: string
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateOfB = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    console.log(this.dateOfB)
  }
  hiringD: string
  addEventhiringDateHiringDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.hiringD = this.datepipe.transform(event.value, 'yyyy-MM-dd');
    console.log(this.hiringD)
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
  downloadFile(fileName) {
    var filePath = `${environment.getImageByName}wwwroot/documentFiles/${fileName}`;
    window.open(filePath);
  }
  delDocument(id: number) {
    console.log(id)
    this.employeeDocumentservice.deletedocument(id).subscribe(res => {
      this.employeeDocumentservice.GetEmployeeDocmentsByEmployeeId(this.EmployeeID).subscribe(d => {
        this.lstTest = d
        console.log("this.employeeId", this.EmployeeID)
      }), err => console.log(err)
    })
  }

  SaveDocuentToDB() {

    this.employeeDocumentservice.AddEmployeeDocument(this.lstoddocproj).subscribe(e => {
      this.employeeDocumentservice.GetEmployeeDocmentsByEmployeeId(this.EmployeeID).subscribe(d => {
        // this.documents = d;
        // this.lstoddocproj=d
        // this.project1.listOfdocuments = this.documents;
        this.Employee.listOfdocuments = d;
        this.lstTest = this.Employee.listOfdocuments
        this.empImage = {
          id: 0, documentName: '', employeeID: this.EmployeeID, fileName: '', employeeName: ''
        };
      }), err => console.log(err)
    })
  }
  Savedoctolist() {
    this.lstoddocproj.push(this.empImage);
    this.empImage = {
      id: 0, documentName: '', employeeID: this.EmployeeID, fileName: '', employeeName: ''
    };
    console.log(this.lstoddocproj);
  }

  showdocDialog() {
    this.displaydoc = true
    this.lstoddocproj = []

  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.empImage.fileName = fileToUpload.name;
    console.log(fileToUpload.name)

    this.httpClient.post(environment.uploadImage, formData)
      .subscribe(res => {
        console.log(res)
        alert('Uploaded Successfully.');



      });
  }
}
