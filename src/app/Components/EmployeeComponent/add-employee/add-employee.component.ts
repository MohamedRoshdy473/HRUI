import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProfession } from 'src/app/Data_Types/iprofession'
import { from } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service'
import { Employee } from 'src/app/Data_Types/employee'
import { EmployeeDocuments } from 'src/app/Data_Types/EmployeeDocuments'
import { Gender } from 'src/app/Data_Types/gender'
import { MaritalStatus } from 'src/app/Data_Types/marital-status'
import { Profession } from 'src/app/Data_Types/profession'
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PositionLevelService } from 'src/app/Services/position-level.service'
import { PositionsService } from 'src/app/Services/positions.service'
import { UniversitiesService } from 'src/app/Services/universities.service'
import { EmployeeDocumentsService } from 'src/app/Services/employee-documents.service'
import { FacultyService } from 'src/app/Services/faculty.service'
import { FacultyDepartmentService } from 'src/app/Services/faculty-department.service'
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { date } from '@rxweb/reactive-form-validators';
import { EducationStatusService } from 'src/app/Services/education-status.service';
import { SchoolService } from 'src/app/Services/school.service';
import { SchoolDepartmentsService } from 'src/app/Services/school-departments.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [DatePipe]
})
export class AddEmployeeComponent implements OnInit {
  title = 'FormValidation';
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  NationalIdPatern = "^[0-9]{14}$";
  phonePatern = "^((\\+91-?)|0)?[0-9]{9}$";
  isValidFormSubmitted = false;

  profession: any;
  @ViewChild('alert', { static: true }) alert: ElementRef;
  selectedFile: any;
  Employee: Employee;
  positionLevel: any;
  Positions: any;
  Universities: any;
  Faculties: any;
  FacultyDepartments: any;
  selectedGender: Gender;
  showAlert: boolean = true
  selectedProfession: Profession;
  selectedMaritalStatus: MaritalStatus;
  empImage: EmployeeDocuments
  employeeId: any
  lstemployeeImages: EmployeeDocuments[]
  displaydoc: boolean = false
  lstoddocproj: EmployeeDocuments[]
  model = new Employee();
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;
  hiringdate: any;
  diabledButton: boolean;
  genderType: Gender[] = [
    { name: 'Male' },
    { name: 'Female' }
  ];
  MaritalStatus: MaritalStatus[] = [
    { name: 'Single' },
    { name: 'Married' }
  ];
  fileToUpload: File;
  uploadedFiles: any[] = [];
  bithdate: Date;
  year: any;
  month: any;
  day: any;
  maxDate: any;
  lstEducationStatus: any;
  ShowSectionHighEducation: boolean;
  ShowSectionMiddleEducation: boolean;
  ShowSectionPropEducation: boolean;
  IsHidden: boolean = false;

  lstSchools: any
  lstSchoolDepartments: any
  educationName: any;
  constructor(private empService: EmployeeService, private router: Router, private datePipe: DatePipe,
    private positionLevelService: PositionLevelService, private positionsService: PositionsService,
    private univertyService: UniversitiesService, private FacultyService: FacultyService,
    private httpClient: HttpClient, private messageService: MessageService,
    private employeeDocumentservice: EmployeeDocumentsService,
    private educationStatusService: EducationStatusService,
    private facultyDepartmentService: FacultyDepartmentService,
    private schoolService: SchoolService,
    private schoolSepartmentService: SchoolDepartmentsService
  ) {
    this.Employee = {
      education: '', schoolId: 0, schoolName: '', professionName: '', isActive: true, schoolDepartmentId: 0, schoolDepartmentName: '',
      address: '', email: '', graduatioYear: '', nationalId: '', mobile: '', dateOfBirth: '', emailCompany: '', facultyDepartmentName: ''
      , maritalStatus: 'Marital Status', name: '', facultyId: 0, facultyName: '', hiringDateHiringDate: '', id: 0, positionLevelName: '', positionName: '',
      phone: '', professionID: 0, relevantPhone: '', photo: 'dummyPerson.png', code: '', gender: 'Gender', positionId: 0, universityId: 0, universityName: '', listOfdocuments: [],
      positionlevelId: 0, facultyDepartmentId: 0
    };

    this.selectedGender = { name: '' };
    this.selectedMaritalStatus = { name: '' };
    this.selectedProfession = { id: 0, name: '', managerID: 0, managerName: "" };

  }
  // onFormSubmit(form: NgForm) {
  //   this.isValidFormSubmitted = false;
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.isValidFormSubmitted = true;
  //   form.resetForm();
  // }
  ngOnInit(): void {
    this.diabledButton = false
    
    this.ShowSectionHighEducation = true
    this.ShowSectionMiddleEducation = true
    this.ShowSectionPropEducation = true

    this.hiringdate = new Date;
    this.bithdate = new Date();
    this.year = this.bithdate.getFullYear();
    this.month = this.bithdate.getMonth();
    this.day = this.bithdate.getDay();
    this.maxDate = (this.year - 16) + "-" + (this.month + 1) + "-" + this.day
    console.log("maxDate", this.maxDate);

    this.lstoddocproj = []
    this.lstemployeeImages = []
    this.empImage = {
      documentName: '', employeeID: 0, employeeName: '', fileName: '', id: 0
    }
    this.educationStatusService.getAllEducationStatus().subscribe(
      res => { this.lstEducationStatus = res, console.log("lstEducationStatus", this.lstEducationStatus) },
      err => console.log(err)
    )

    this.schoolService.getAllSchool().subscribe(
      res => { this.lstSchools = res, console.log("lstSchools", this.lstSchools) },
      err => console.log(err)
    )
    this.positionLevelService.getAllPositionLevel().subscribe(
      res => { this.positionLevel = res; console.log("levels", this.positionLevel) },
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
    this.empService.getProfession().subscribe(
      (res) => { this.profession = res; console.log(this.profession) },
      (err) => { console.log(err) }
    );
    console.log("fileToUpload.name", this.fileToUpload)
  }
  onchangeSchool($event) {
    this.schoolSepartmentService.GetAllSchoolDepartmentsBySchoolId($event.target.value).subscribe(
      res => { this.lstSchoolDepartments = res; console.log("lstSchoolDepartments", this.lstSchoolDepartments) },
      err => console.log(err)
    )
  }
  show() {
    this.IsHidden = true
  }
  onchangeEducationStatus($event) {

    console.log("event", $event.target.value)
    this.educationName = $event.target.value
    if (this.educationName == "High qualified") {
      this.ShowSectionHighEducation = false
      this.ShowSectionMiddleEducation = true
      this.ShowSectionPropEducation = true
    }
    if (this.educationName == "Middle qualified") {
      this.ShowSectionHighEducation = true
      this.ShowSectionMiddleEducation = false
      this.ShowSectionPropEducation = true
    }
    if (this.educationName == "preparatory") {
      this.ShowSectionPropEducation = false
      this.ShowSectionHighEducation = true
      this.ShowSectionMiddleEducation = true
    }
    if (this.educationName == "Without education") {
      this.ShowSectionPropEducation = false
      this.ShowSectionHighEducation = true
      this.ShowSectionMiddleEducation = true
    }
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
  check($event) {
    console.log("event", $event)
  }
  add(frm: NgForm) {
    this.Employee.professionID = Number(this.Employee.professionID);
    this.Employee.graduatioYear = String(this.Employee.graduatioYear);
    this.Employee.nationalId = String(this.Employee.nationalId)
    this.Employee.phone = String(this.Employee.phone)
    this.Employee.mobile = String(this.Employee.mobile)
    this.Employee.relevantPhone = String(this.Employee.relevantPhone)

    this.Employee.positionId = Number(this.Employee.positionId);
    this.Employee.positionlevelId = Number(this.Employee.positionlevelId);
    this.Employee.facultyDepartmentId = Number(this.Employee.facultyDepartmentId);
    //this.Employee.DateOfBirth = this.datePipe.transform(this.Employee.DateOfBirth, "dd-MM-yyyy");
    //this.Employee.HiringDateHiringDate = this.datePipe.transform(this.Employee.HiringDateHiringDate, "yyyy-MM-dd")
    // this.isValidDate = this.validateDates(this.Employee.DateOfBirth, this.Employee.HiringDateHiringDate);
    console.log("before add", this.Employee)
    // if (this.isValidDate) {
    this.empService.AddEmployee(this.Employee).subscribe(
      res => {
        console.log("after employeeres", this.Employee)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Added' });
        this.employeeId = res
        this.empImage.employeeID = this.employeeId,
          this.diabledButton = false
        this.showdocDialog()

        //  this.router.navigate(['/employee']);
      },
      error => console.log(error),
    );

  }
  //  }
  //  this.isValidFormSubmitted = true;
  // }
  validateDates(sDate: string, eDate: string) {
    this.isValidDate = true;
    if ((sDate == null || eDate == null)) {
      this.error = { isError: true, errorMessage: 'Start date and end date are required.' };
      this.isValidDate = false;
    }

    if ((sDate != null && eDate != null) && (eDate) < (sDate)) {
      this.error = { isError: true, errorMessage: 'End date should be greater than start date.' };
      this.isValidDate = false;
    }
    return this.isValidDate;
  }
  comparedate() {
    this.isValidDate = true;
    this.isValidDate = this.validateDates(this.Employee.dateOfBirth, this.Employee.hiringDateHiringDate);
    if (!this.isValidDate) {
      this.error = { isError: true, errorMessage: 'End date should be greater than start date.' };
    }
    if (this.isValidDate) {
      console.log("this.Employee.HiringDateHiringDate", this.Employee.hiringDateHiringDate)
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
      // alert("image Uploaded Successfuly")
      // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
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

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    alert("Image uploaded");
  }
  closeAlert() {
    //this.alert.nativeElement.classList.remove('show');
    this.showAlert = false
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Uploaded Successfully' });
        console.log(res)
      });
  }


  // SaveimageToDB() {

  //   this.employeeDocumentservice.AddEmployeeDocument(this.lstemployeeImages).subscribe(e => {
  //     console.log(e)
  //     this.Employee = {
  //       Address: '', DateOfBirth: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), Email: '', GraduatioYear: ''
  //       , hiringDateHiringDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), MaritalStatus: 'Marital Status', Name: '',
  //       Phone: '', ProfessionID: 0, RelevantPhone: '', photo: 'dummyPerson.png', code: '', gender: 'Gender',PositionId:0  ,
  //       PositionlevelId:0,FacultyDepartmentId:0
  //     };
  //     this.router.navigate(['/employee'])
  //   })

  // }


  SaveDocuentToDB() {

    this.employeeDocumentservice.AddEmployeeDocument(this.lstoddocproj).subscribe(e => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved Successfully To Employee' });
      this.employeeDocumentservice.GetEmployeeDocmentsByEmployeeId(this.employeeId).subscribe(d => {
        // this.documents = d;
        // this.lstoddocproj=d
        // this.project1.listOfdocuments = this.documents;
        this.Employee.listOfdocuments = d;
        // this.lstTest=this.Employee.listOfdocuments
        this.empImage = {
          id: 0, documentName: '', employeeID: this.employeeId, fileName: '', employeeName: ''
        };
      }), err => console.log(err)
    })
  }
  Savedoctolist() {
    console.log("empId", this, this.employeeId)
    this.lstoddocproj.push(this.empImage);
    this.empImage = {
      id: 0, documentName: '', employeeID: this.employeeId, fileName: '', employeeName: ''
    };
    console.log(this.lstoddocproj);
  }

  showdocDialog() {
    this.displaydoc = true
    this.lstoddocproj = []
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record Added' });
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
  showCustom() {
    this.messageService.add({ severity: 'custom', summary: 'Custom', detail: 'Message Content' });
  }
  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'Info', detail: 'Message Content' });
  }
  showTopCenter() {
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }
  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }
  onConfirm() {
    this.messageService.clear('c');
  }
  onReject() {
    this.messageService.clear('c');
  }
}
