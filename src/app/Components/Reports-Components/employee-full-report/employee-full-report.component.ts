import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ProfessionService } from 'src/app/Services/profession.service';
import {ExcuseService} from 'src/app/Services/excuse.service';
import 'jspdf-autotable';
import jsPDF from 'jspdf'
import { LeaveService } from 'src/app/Services/leave.service';
import { PDFDocument } from 'pdf-lib'
import { required } from '@rxweb/reactive-form-validators';
import { refCount } from 'rxjs/operators';
import { AttendanceService } from 'src/app/Services/attendance.service';


@Component({
  selector: 'app-employee-full-report',
  templateUrl: './employee-full-report.component.html',
  styleUrls: ['./employee-full-report.component.css']
})
export class EmployeeFullReportComponent implements OnInit {
  Allexcuses: any[];
  FilteredExcuses: any;
  EmpReportObj: any;
  AllEmployeesByProfession: any;
  AllProfessions: any;
  Idtranslate: any
  emptranslate: any;
  Professiontranslate: any;
  Datetranslate: any;
  Timetetranslate: any;
  Hourstranslate: any;
  Statustranslate: any;
  Excusestranslate: any;
  ALMostakbaltranslate: any;
  EmpID: number
  ProfID: number
  AllLeaves: any[];
  FilteredLeaves: any;
  exDate: any;
  Leavestranslate: any;
  StartDatetranslate: any;
  Daystranslate: any;
  AlternativeEmployeetranslate: any;
  LeaveTypetranslate: any;
  constructor(private attensanceService:AttendanceService,private translate: TranslateService,private Leaveservice:LeaveService, private ExcuseService: ExcuseService, private professionService: ProfessionService, private datePipe: DatePipe, private EmpService: EmployeeService) { }

  ngOnInit(): void {
    this.exDate = this.datePipe.transform(new Date(), "dd/MM/yyyy")
    this.EmpReportObj = {      Comment: '', AlternativeAddress: '', Status: 'pending',
    AlternativeEmpID: 0, Days: 0, employeeId: 0, LeaveTypeID: 0, approved: "pending", employeeName: '', id: 0, profession: '', startdate: new Date(), endDate: new Date(), comment: '', hours: 0, time: { hours: 0, minutes: 0 } };

    this.Allexcuses = []
    this.professionService.getAllProfession().subscribe(
      data => { this.AllProfessions = data, console.log("AllProfessions", data) },
      error => console.log(error)
    );
    // this.ExcuseService.AllExcuses().subscribe(
    //   data => {
    //     this.Allexcuses = data;
    //     this.FilteredExcuses = data
    //     console.log("data", data)
    //   });
    // this.Leaveservice.AllLeaves().subscribe(
    //   data => {
    //     this.AllLeaves = data, this.FilteredLeaves = data,
    //     console.log("AllLeaves", this.AllLeaves)
    //   },
    //   error => console.log(error)
    // );
  }
  onChange(ProfessionId) {
    this.ProfID = ProfessionId;
    this.EmpService.GetAllEmployeesByProfession(ProfessionId).subscribe(
      data => { this.AllEmployeesByProfession = data },
      error => console.log(error)
    )
  }
  onChangeEmp($event) {
    console.log("EmpId", $event.target.value)
    this.EmpID = $event.target.value;
    let EmpName = $event.target.options[$event.target.options.selectedIndex].text;
    console.log("name",EmpName)
  }
  DownloadReport() {
    this.getReport();
  }
  getReport() {
    this.translate.get(['HR.AL-Mostakbal', 'HR.Excuses', 'HR.Id', 'HR.Employee Name', 'HR.Profession Name', 'HR.Date', 'HR.Time', 'HR.Hours', 'HR.Status','HR.Leaves','HR.Start Date','HR.Days','HR.Alternative Employee','HR.Leave Type']).subscribe((data: any) => {
      console.log("Translated data", data);
      this.ALMostakbaltranslate = data['HR.AL-Mostakbal']
      this.Excusestranslate = data['HR.Excuses']
      this.Idtranslate = data['HR.Id']
      this.emptranslate = data['HR.Employee Name']
      this.Professiontranslate = data['HR.Profession Name']
      this.Datetranslate = data['HR.Date']
      this.Timetetranslate = data['HR.Time']
      this.Hourstranslate = data['HR.Hours']
      this.Statustranslate = data['HR.Status']

      this.Leavestranslate = data['HR.Leaves']
      this.StartDatetranslate = data['HR.Start Date']
      this.Daystranslate = data['HR.Days']
      this.AlternativeEmployeetranslate = data['HR.Alternative Employee']
      this.LeaveTypetranslate = data['HR.Leave Type']


    });
    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('l');
    var docExcuse = new jsPDF('l');
    var docLeave = new jsPDF('l');
    doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    doc.setFont('ARIALUNI');
    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text(this.ALMostakbaltranslate, 50, 25, { "align": "left" });
   doc.text(this.Leavestranslate, 15, 45, { "align": "left" });
    doc.text(this.Excusestranslate, 15, 110, { "align": "left" });
    var colExcuses = [this.Idtranslate, this.emptranslate, this.Professiontranslate, this.Datetranslate, this.Timetetranslate, this.Hourstranslate, this.Statustranslate];
    var colLeave = [this.Idtranslate, this.emptranslate, this.Professiontranslate, this.StartDatetranslate, this.Daystranslate, this.AlternativeEmployeetranslate,this.LeaveTypetranslate, this.Statustranslate];

    var rowsExcuse = [];
    var rowsLeave = [];
    var rowExcuse = [];
    var rowLeave = [];
    //Filteration
    if (this.ProfID != 0) {
      this.ExcuseService.GetExcusesByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredExcuses = data },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredLeaves = data },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 && this.EmpID != 0) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredExcuses = data
        },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 || this.EmpID != 0 && (this.EmpReportObj.startdate == this.exDate && this.EmpReportObj.endDate == this.exDate)) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(
        data => {
          this.Allexcuses = data
          this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.EmpReportObj.startdate && ex.date < this.EmpReportObj.endDate);
        },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeIdAndDate(this.ProfID, this.EmpID,this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      ) 
    }
    if (this.EmpReportObj.startdate == this.exDate && this.EmpReportObj.endDate == this.exDate) {
      this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.EmpReportObj.startdate && ex.date < this.EmpReportObj.endDate);
      this.FilteredLeaves = this.AllLeaves.filter(ex => ex.start > this.EmpReportObj.startdate && ex.start < this.EmpReportObj.endDate);
    }
    this.FilteredExcuses.forEach(element => {
      var ExcuseDate = this.datePipe.transform(element.date, "dd/MM/yyyy");
     rowExcuse = [element.id, element.employeeName, element.professionName, ExcuseDate, element.time, element.hours, element.approved];
      rowsExcuse.push(rowExcuse);
    });
    this.FilteredLeaves.forEach(element => {
      var LeaveDate = this.datePipe.transform(element.start, "dd/MM/yyyy");
      console.log("LeaveDate", LeaveDate)
      rowLeave = [element.id, element.employeeName, element.profession, LeaveDate,element.days, element.alternativeEmp, element.leaveTypeName, element.status];
      rowsLeave.push(rowLeave);
    });

    (doc as any).autoTable(colLeave,rowsLeave,{ startY: 50, styles: { font: 'ARIALUNI' } });
    (doc as any).autoTable(colExcuses,rowsExcuse,{ startY: 120, styles: { font: 'ARIALUNI' } });
     doc.save('Emp.pdf');
  }
  Filter()
  {
    if (this.ProfID != 0) {
      this.ExcuseService.GetExcusesByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredExcuses = data },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredLeaves = data },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 && this.EmpID != 0) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredExcuses = data
        },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 || this.EmpID != 0 && (this.EmpReportObj.startdate == this.exDate && this.EmpReportObj.endDate == this.exDate)) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(
        data => {
          this.Allexcuses = data
          this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.EmpReportObj.startdate && ex.date < this.EmpReportObj.endDate);
        },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeIdAndDate(this.ProfID, this.EmpID,this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      ) 
    }
    if (this.EmpReportObj.startdate == this.exDate && this.EmpReportObj.endDate == this.exDate) {
      this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.EmpReportObj.startdate && ex.date < this.EmpReportObj.endDate);
      this.FilteredLeaves = this.AllLeaves.filter(ex => ex.start > this.EmpReportObj.startdate && ex.start < this.EmpReportObj.endDate);
    }
  }
}
