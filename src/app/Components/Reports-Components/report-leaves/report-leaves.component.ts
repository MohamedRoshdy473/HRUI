import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/Services/leave.service'
import 'jspdf-autotable';
import jsPDF from 'jspdf'
import { DatePipe } from '@angular/common';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ProfessionService } from 'src/app/Services/profession.service';
import { date } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-report-leaves',
  templateUrl: './report-leaves.component.html',
  styleUrls: ['./report-leaves.component.css']
})
export class ReportLeavesComponent implements OnInit {
  AllLeaves: any[];
  FilteredLeaves: any;
  AllEmployeesByProfession: any;
  AllProfessions: any;
  LeaveObj: any;
  EmpID: any;
  ProfID: any;
  exDate: string;
  ALMostakbaltranslate: any;
  Leavestranslate: any;
  emptranslate: any;
  Professiontranslate: any;
  StartDatetranslate: any;
  Daystranslate: any;
  AlternativeEmployeetranslate: any;
  Idtranslate: any;
  Statustranslate: any;
  LeaveTypetranslate: any;
  constructor(private translate: TranslateService,private Leaveservice: LeaveService, private professionService: ProfessionService, private datePipe: DatePipe, private EmpService: EmployeeService) { }
  ngOnInit(): void {
    this.LeaveObj = {
      Comment: '', AlternativeAddress: '', Status: 'pending',
      AlternativeEmpID: 0, Days: 0, employeeId: 0, LeaveTypeID: 0, startdate: new Date(), endDate: new Date(),start:new Date()
    };
    this.Leaveservice.AllLeaves().subscribe(
      data => {
        this.AllLeaves = data, this.FilteredLeaves = data,
        console.log("AllLeaves", this.AllLeaves)
      },
      error => console.log(error)
    );
    this.professionService.getAllProfession().subscribe(
      data => { this.AllProfessions = data, console.log("AllProfessions", data) },
      error => console.log(error)
    );
    this.exDate = this.datePipe.transform(new Date(), "dd/MM/yyyy")
  }
  onChange(ProfessionId) {
    this.ProfID = ProfessionId;
    this.EmpService.GetAllEmployeesByProfession(ProfessionId).subscribe(
      data => { this.AllEmployeesByProfession = data },
      error => console.log(error)
    )
  }
  onChangeEmp(EmpId) {
    console.log("EmpId", EmpId)
    this.EmpID = EmpId;
  }
  DownloadReport() {
    this.getReport();
  }
  getReport() {
    this.translate.get(['HR.AL-Mostakbal', 'HR.Leaves', 'HR.Id', 'HR.Employee Name', 'HR.Profession Name', 'HR.Start Date', 'HR.Days', 'HR.Alternative Employee','HR.Leave Type', 'HR.Status']).subscribe((data: any) => {
      console.log("Translated data", data);
      this.ALMostakbaltranslate = data['HR.AL-Mostakbal']
      this.Leavestranslate = data['HR.Leaves']
      this.Idtranslate = data['HR.Id']
      this.emptranslate = data['HR.Employee Name']
      this.Professiontranslate = data['HR.Profession Name']
      this.StartDatetranslate = data['HR.Start Date']
      this.Daystranslate = data['HR.Days']
      this.AlternativeEmployeetranslate = data['HR.Alternative Employee']
      this.LeaveTypetranslate = data['HR.Leave Type']
      this.Statustranslate = data['HR.Status']
    });

    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('l');
    doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    doc.setFont('ARIALUNI');
    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text(this.ALMostakbaltranslate, 50, 25, { "align": "left" });
    doc.text(this.Leavestranslate, 10, 45, { "align": "left" });
    var col = [this.Idtranslate, this.emptranslate, this.Professiontranslate, this.StartDatetranslate, this.Daystranslate, this.AlternativeEmployeetranslate,this.LeaveTypetranslate, this.Statustranslate];
    var rows = [];
    var row = [];
    //var type = this.Allexcuses.reduce((typeName, el) =>  el.employeeName,'Ekram');
    if (this.ProfID != 0) {
      this.Leaveservice.GetLeaveRequestsByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredLeaves = data },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 && this.EmpID != 0) {
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 && this.EmpID != 0 && (this.LeaveObj.startdate != this.exDate && this.LeaveObj.endDate != this.exDate)) {
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeIdAndDate(this.ProfID, this.EmpID,this.LeaveObj.startdate, this.LeaveObj.endDate).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      )    }
    if (this.LeaveObj.startdate == this.exDate && this.LeaveObj.endDate == this.exDate) {
        this.FilteredLeaves = this.AllLeaves.filter(ex => ex.start > this.LeaveObj.startdate && ex.start < this.LeaveObj.endDate);
    }
      this.FilteredLeaves.forEach(element => {
        var LeaveDate = this.datePipe.transform(element.start, "dd/MM/yyyy");
        console.log("LeaveDate", LeaveDate)
        row = [element.id, element.employeeName, element.profession, LeaveDate,element.days, element.alternativeEmp, element.leaveTypeName, element.status];
        rows.push(row);
      });
    //row = [this.FilteredLeaves, { startY: 50, styles: { font: 'ARIALUNI', colSpan: 8 } }];
    (doc as any).autoTable(col, rows, { startY: 50, styles: { font: 'ARIALUNI' } });
    doc.save('leave.pdf');
  }
  Filter() {
    if (this.ProfID != 0) {
      this.Leaveservice.GetLeaveRequestsByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredLeaves = data },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 && this.EmpID != 0) {
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 && this.EmpID != 0 && (this.LeaveObj.startdate != this.exDate && this.LeaveObj.endDate != this.exDate)) {
      this.Leaveservice.GetLeaveRequestsByProfessionIdEmployeeIdAndDate(this.ProfID, this.EmpID,this.LeaveObj.startdate, this.LeaveObj.endDate).subscribe(
        data => {
          this.FilteredLeaves=data
        },
        error => console.log(error)
      )    }
    if (this.LeaveObj.startdate == this.exDate && this.LeaveObj.endDate == this.exDate) {
        this.FilteredLeaves = this.AllLeaves.filter(ex => ex.start > this.LeaveObj.startdate && ex.start < this.LeaveObj.endDate);
    }
  }
}
