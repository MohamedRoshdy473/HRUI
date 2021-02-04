import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProfession } from 'src/app/Data_Types/iprofession'
import { from } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service'
import { Employee } from 'src/app/Data_Types/employee'
import { EmployeeDocuments } from 'src/app/Data_Types/EmployeeDocuments'
import { Gender } from 'src/app/Data_Types/gender'
import { MaritalStatus } from 'src/app/Data_Types/marital-status'
import { Profession } from 'src/app/Data_Types/profession'
import { SelectItem } from 'primeng/api';
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
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [DatePipe]
})
export class AddEmployeeComponent implements OnInit {
  title = 'FormValidation';  
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
 isValidFormSubmitted = false;  

  profession: any;
  @ViewChild('alert', { static: true }) alert: ElementRef;
  selectedFile: any;
  Employee: any;
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
  employeeId:any
  lstemployeeImages: EmployeeDocuments[]
  displaydoc: boolean=false
  lstoddocproj:EmployeeDocuments[]

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
  constructor(private empService: EmployeeService, private router: Router,
    private positionLevelService: PositionLevelService, private positionsService: PositionsService,
    private univertyService: UniversitiesService, private FacultyService: FacultyService,
    private httpClient: HttpClient,
    private employeeDocumentservice:EmployeeDocumentsService,

    private facultyDepartmentService: FacultyDepartmentService,) {
    this.Employee = {
      Address: '', DateOfBirth: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), Email: '', GraduatioYear: ''
      , hiringDateHiringDate: new Date(2018, 0O5, 0O5, 17, 23, 42, 11), MaritalStatus: 'Marital Status', Name: '',
      Phone: '', ProfessionID: 0, RelevantPhone: '', photo: 'dummyPerson.png', code: '', gender: 'Gender',PositionId:0  ,
      PositionlevelId:0,FacultyDepartmentId:0
    };

    this.selectedGender = { name: '' };
    this.selectedMaritalStatus = { name: '' };
    this.selectedProfession = { id: 0, name: '' };

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
    this.lstoddocproj=[]
    this.lstemployeeImages=[]
    this.empImage={
      documentName:'',employeeID:0,employeeName:'',fileName:'',id:0
    }
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
  onchangeUniversity($event) {
    console.log("uni", $event.target.value)
    this.FacultyService.GetFacultiesByUniversityId($event.target.value).subscribe(
      res => { this.Faculties = res; console.log("Faculties", this.Faculties) },
      err => console.log(err)
    )
  }
  onchangeFaculty($event)
  {
    this.facultyDepartmentService.GetFacultyDepartmentsByFacultyId($event.target.value).subscribe(
      res => { this.FacultyDepartments = res; console.log("FacultyDepartments", this.FacultyDepartments) },
      err => console.log(err)
    )
  }
  add() {

    console.log(typeof (this.Employee.ProfessionID));
    this.Employee.ProfessionID = Number(this.Employee.ProfessionID);
   this.Employee.GraduatioYear = String(this.Employee.GraduatioYear);
   this.Employee.NationalId=String(this.Employee.NationalId)
    this.Employee.PositionId=Number(this.Employee.PositionId);
    this.Employee.PositionlevelId=Number(this.Employee.PositionlevelId);
    this.Employee.FacultyDepartmentId=Number(this.Employee.FacultyDepartmentId);
    console.log(typeof (this.Employee.ProfessionID));

    console.log(this.Employee);
    this.empService.AddEmployee(this.Employee).subscribe(
      res => { 
        console.log("employeeres",res)
         this.employeeId=res
         this.empImage.employeeID=this.employeeId
      //  this.router.navigate(['/employee']);
     },
     // 
     error => console.log(error),
    );
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
        console.log(res)
        alert('Uploaded Successfully.');



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
      this.employeeDocumentservice.GetEmployeeDocmentsByEmployeeId(this.employeeId).subscribe(d => {
       // this.documents = d;
      // this.lstoddocproj=d
       // this.project1.listOfdocuments = this.documents;
        this.Employee.listOfdocuments = d;
       // this.lstTest=this.Employee.listOfdocuments
        this.empImage = {
          id: 0,documentName : '', employeeID:this.employeeId,fileName:'',employeeName:''
        };
      }), err => console.log(err)
    })
  }
  Savedoctolist() {
    console.log("empId",this,this.employeeId)
    this.lstoddocproj.push(this.empImage);
    this.empImage = {
      id: 0,documentName : '', employeeID:this.employeeId,fileName:'',employeeName:''
    };
    console.log(this.lstoddocproj);
  }

  showdocDialog() {
    this.displaydoc = true
  this.lstoddocproj=[]
  }

 
}
