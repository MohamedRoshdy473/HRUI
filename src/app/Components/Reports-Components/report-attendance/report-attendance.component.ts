import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ProfessionService } from 'src/app/Services/profession.service';
import 'jspdf-autotable';
import jsPDF from 'jspdf'
@Component({
  selector: 'app-report-attendance',
  templateUrl: './report-attendance.component.html',
  styleUrls: ['./report-attendance.component.css']
})
export class ReportAttendanceComponent implements OnInit {
  AllAttendances: any;
  FilteredAttendance: any;
  AllEmployeesByProfession: any;
  AllProfessions: any;
  AttendanceObj: any;
  EmpID: any;
  ProfID: any;
  AttendanceDate: string;
  ALMostakbaltranslate: any;
  Attendancetranslate: any;
  emptranslate: any;
  Professiontranslate: any;
  Arrivaltranslate: any;
  Departuretranslate: any;
  Idtranslate: any;
  arrivalList: any;
  departureList: any;
  exDate: string;
  arrive: string;
  depart: string;
  constructor(private translate: TranslateService, private professionService: ProfessionService, private datePipe: DatePipe, private EmpService: EmployeeService, private AttService: AttendanceService) { }

  ngOnInit(): void {
    this.arrivalList = [];
    this.departureList = [];
    this.AttendanceObj = {
      id: 0, arrival: new Date(), daparture: new Date(), employeeId: 0, employeeName: '',
      time: { hours: 0, minutes: 0 }, professionId: 0, professionName: '', startdate: new Date(), endDate: new Date()
    };
    this.AttService.GetAttendances().subscribe(res => {
      this.AllAttendances = res,
        this.FilteredAttendance = res
      console.log("AllAttendances", this.AllAttendances)
    },
      err => console.log(err)
    );
    this.professionService.getAllProfession().subscribe(
      data => { this.AllProfessions = data },
      error => console.log(error)
    );
    this.exDate = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    console.log("this.exDate", this.exDate)
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
    this.translate.get(['HR.AL-Mostakbal', 'HR.Attendance', 'HR.Id', 'HR.Employee Name', 'HR.Profession Name', 'HR.Arrival', 'HR.Departure']).subscribe((data: any) => {
      console.log("Translated data", data);
      this.Idtranslate = data['HR.Id']
      this.ALMostakbaltranslate = data['HR.AL-Mostakbal']
      this.Attendancetranslate = data['HR.Attendance']
      this.emptranslate = data['HR.Employee Name']
      this.Professiontranslate = data['HR.Profession Name']
      this.Arrivaltranslate = data['HR.Arrival']
      this.Departuretranslate = data['HR.Departure']

    });

    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('l');
    doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    doc.setFont('ARIALUNI');
    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text(this.ALMostakbaltranslate, 50, 25, { "align": "left" });
    doc.text(this.Attendancetranslate, 10, 45, { "align": "left" });
    var col = [this.emptranslate, this.Arrivaltranslate, this.Departuretranslate];
    var rows = [];
    var row = [];
    if (this.ProfID != undefined) {
      this.AttService.GetAttendancesByProfessionId(this.ProfID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.ProfID != undefined && this.EmpID != undefined) {
      this.AttService.GetAttendancesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.ProfID != undefined && this.EmpID != undefined && (this.AttendanceObj.startdate != this.exDate && this.AttendanceObj.endDate != this.exDate)) {
      this.AttService.GetAttendancesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.AttendanceObj.startdate, this.AttendanceObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.AttendanceObj.startdate != this.exDate && this.AttendanceObj.endDate != this.exDate) {
      this.AttService.GetAttendancesByDate(this.AttendanceObj.startdate, this.AttendanceObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    this.FilteredAttendance.forEach(element => {
      this.arrivalList = []
      this.departureList = []

      element.lstAttendance.forEach(ele => {
        if (ele.arrival) {
          // console.log("ele", ele)
          var ArrivalDate = this.datePipe.transform(ele.arrival, "dd/MM/yyyy h:mm:ss a");
          this.arrivalList.push(ArrivalDate.replace(",", "") + '\n\n')
        }
        if (ele.departure) {
          console.log("ele", ele)
          var DepartureDate = this.datePipe.transform(ele.departure, "dd/MM/yyyy h:mm:ss a");
          this.departureList.push(DepartureDate.replace(",", "") + '\n\n');

        }
       // this.departureList.join("\n")
      })
      row = [element.employeeName, this.arrivalList, this.departureList];
      rows.push(row);
      console.log("arrivalList", this.arrivalList)
    });
    (doc as any).autoTable(col, rows, { startY: 50, styles: { font: 'ARIALUNI', margin: 13 } });
    doc.save('Attendance.pdf');
  }
  Filter() {
    console.log("this.ProfID ", this.ProfID);
    console.log("this.EmpID ", this.EmpID);
    if (this.ProfID != undefined) {
      this.AttService.GetAttendancesByProfessionId(this.ProfID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.ProfID != undefined && this.EmpID != undefined) {
      this.AttService.GetAttendancesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.ProfID != undefined && this.EmpID != undefined && (this.AttendanceObj.startdate != this.exDate && this.AttendanceObj.endDate != this.exDate)) {
      this.AttService.GetAttendancesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.AttendanceObj.startdate, this.AttendanceObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.AttendanceObj.startdate != this.exDate && this.AttendanceObj.endDate != this.exDate) {
      this.AttService.GetAttendancesByDate(this.AttendanceObj.startdate, this.AttendanceObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
  }
}