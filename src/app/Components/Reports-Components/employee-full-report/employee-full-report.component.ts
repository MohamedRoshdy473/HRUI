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
  EmpID: number=0
  ProfID: number
  AllLeaves: any[];
  FilteredLeaves: any;
  exDate: any;
  Leavestranslate: any;
  StartDatetranslate: any;
  Daystranslate: any;
  AlternativeEmployeetranslate: any;
  LeaveTypetranslate: any;
  AllAttendances: any;
  FilteredAttendance: any;
  AttendanceObj: any;
  Arrivaltranslate: any;
  Departuretranslate: any;
  arrivalList: any;
  departureList: any;
  Attendancetranslate: any;
  AttendDate: string;
  ExcusesDatelList: any
  ExcusesTimelList: any
  ExcusesHourlList: any
  ExcusesStatuslList: any
  LeaveDatelList: any[];
  LeaveStartDatelList: any[];
  LeaveDayslList: any[];
  LeaveStatuslList: any[];
  LeaveAlternativeEmployeelList: any[];
  LeaveleaveTypeList: any[];
  constructor(private attensanceService:AttendanceService,private translate: TranslateService,private Leaveservice:LeaveService, private ExcuseService: ExcuseService, private professionService: ProfessionService, private datePipe: DatePipe, private EmpService: EmployeeService) { }

  ngOnInit(): void {
    this.exDate = this.datePipe.transform(new Date(), "dd/MM/yyyy")
    this.AttendDate = this.datePipe.transform(new Date(), "yyyy-MM-dd")

    this.EmpReportObj = {Comment: '', AlternativeAddress: '', Status: 'pending',
    AlternativeEmpID: 0, Days: 0, employeeId: 0, LeaveTypeID: 0, approved: "pending", employeeName: '',
     id: 0, profession: '', startdate: new Date(), endDate: new Date(), comment: '', hours: 0, time: { hours: 0, minutes: 0 }
    , arrival: new Date(), daparture: new Date(),};
    this.arrivalList = [];
    this.departureList = [];
    this.Allexcuses = [];
    this.ExcusesDatelList = []
    this.ExcusesTimelList = []
    this.ExcusesHourlList = []
    this.ExcusesStatuslList = []
    
    this.LeaveStartDatelList = []
    this.LeaveDayslList = []
    this.LeaveAlternativeEmployeelList = []
    this.LeaveStatuslList = []
    this.LeaveleaveTypeList=[]

    this.professionService.getAllProfession().subscribe(
      data => { this.AllProfessions = data, console.log("AllProfessions", data) },
      error => console.log(error)
    );
  }
  onChange(ProfessionId) {
    console.log("ProfessionId", ProfessionId)
    this.AllEmployeesByProfession = []
    this.EmpID = undefined
    this.ProfID = ProfessionId;
    this.EmpService.GetAllEmployeesByProfession(ProfessionId).subscribe(
      data => {
        this.AllEmployeesByProfession = data
      },
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
    this.translate.get(['HR.AL-Mostakbal', 'HR.Excuses', 'HR.Id', 'HR.Employee Name', 'HR.Profession Name', 'HR.Date', 'HR.Time', 'HR.Hours', 'HR.Status','HR.Leaves','HR.Start Date','HR.Days','HR.Alternative Employee','HR.Leave Type','HR.Arrival','HR.Departure','HR.Attendance']).subscribe((data: any) => {
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
      this.Arrivaltranslate = data['HR.Arrival'] 
      this.Departuretranslate = data['HR.Departure']
      this.Attendancetranslate = data['HR.Attendance']


    });
    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('p');
  
    // doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    // doc.setFont('ARIALUNI');
    // var img = new Image()
    // img.src = 'assets/images/logo.jpeg'
    // doc.addImage(img, 'png', 10, 10, 23, 23);
   

    doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    doc.setFont('ARIALUNI');
    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text(this.ALMostakbaltranslate, 50, 25, { "align": "left" });


   var colExcuses = [this.emptranslate, this.Professiontranslate, this.Datetranslate, this.Timetetranslate, this.Hourstranslate, this.Statustranslate];
    let headExecuses = [[{content: "Execuses", colSpan: 7, styles: { fillColor:  [255, 255, 255],textColor :[0,0,0] ,fontSize:14 }}],colExcuses];


    var colLeave = [this.emptranslate, this.Professiontranslate, this.StartDatetranslate, this.Daystranslate, this.AlternativeEmployeetranslate,this.LeaveTypetranslate, this.Statustranslate];
    let headLeaves = [[{content: "Leaves", colSpan: 8, styles: { fillColor:  [255, 255, 255],textColor :[0,0,0] ,fontSize:14 }}],colLeave  ];

   
   
   
   
   
    var colAttendance = [this.emptranslate, this.Arrivaltranslate, this.Departuretranslate];
    let headAttendance = [[{content: "Attendance", colSpan: 3, styles: { fillColor:  [255, 255, 255],textColor :[0,0,0] ,fontSize:14 }}      ],      colAttendance  ];
    var rowsExcuse = [];
    var rowsLeave = [];
    var rowExcuse = [];
    var rowLeave = [];
    var rowAttendance = [];
    var rowsAttendance = [];
    //Filteration
    if ((this.ProfID != undefined || this.ProfID != 0) && (this.EmpID == undefined || this.EmpID == 0)) {
      this.ExcuseService.GetExcusesByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredExcuses = data },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredLeaves = data },
        error => console.log(error)
      )
      this.attensanceService.GetAttendancesByProfessionId(this.ProfID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if ((this.EmpID != undefined || this.EmpID != 0)) {
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
      this.attensanceService.GetAttendancesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(res =>
        this.FilteredAttendance = res
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
      this.attensanceService.GetAttendancesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.EmpReportObj.startdate, this.EmpReportObj).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.EmpReportObj.startdate == this.exDate && this.EmpReportObj.endDate == this.exDate) {
      this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.EmpReportObj.startdate && ex.date < this.EmpReportObj.endDate);
      this.FilteredLeaves = this.AllLeaves.filter(ex => ex.start > this.EmpReportObj.startdate && ex.start < this.EmpReportObj.endDate);
      this.attensanceService.GetAttendancesByDate(this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    this.FilteredExcuses.forEach(element => {
      this.ExcusesDatelList = []
      this.ExcusesTimelList = []
      this.ExcusesHourlList = []
      this.ExcusesStatuslList = []
      element.lstExcuse.forEach(ele => {
        if (ele.date) {
          var ExcuseDate = this.datePipe.transform(ele.date, "dd/MM/yyyy");
          this.ExcusesDatelList.push(ExcuseDate.replace(",", "") + '\n\n');
        }
        if(ele.time)
        {
          console.log("Time",ele.time)
          this.ExcusesTimelList.push(ele.time.replace(",","") + `\n\n`);
        }
        if(ele.hours) 
        {
          this.ExcusesHourlList.push((ele.hours).toString().replace(",","") + `\n\n`);
        }
        if(ele.approved)
        {
          this.ExcusesStatuslList.push(ele.approved.replace(",", "") + '\n\n');
        }
      });

      rowExcuse = [element.employeeName, element.professionName, this.ExcusesDatelList, this.ExcusesTimelList,this.ExcusesHourlList ,this.ExcusesStatuslList ];
      rowsExcuse.push(rowExcuse);
    });

    this.FilteredLeaves.forEach(element => {
      this.LeaveStartDatelList = []
      this.LeaveDayslList = []
      this.LeaveAlternativeEmployeelList = []
      this.LeaveStatuslList = []
      this.LeaveleaveTypeList=[]
      element.lstLeaveRequest.forEach(ele => {
        if (ele.start) {
          var LeaveDate = this.datePipe.transform(ele.start, "dd/MM/yyyy");
          this.LeaveStartDatelList.push(LeaveDate.replace(",", "") + '\n\n');
        }
        if(ele.days)
        {
          this.LeaveDayslList.push((ele.days.toString().replace(",","") + `\n\n`));
        }
        if(ele.alternativeEmp)
        {
          console.log("ele.alternativeEmp.name",ele.alternativeEmp.name)
          this.LeaveAlternativeEmployeelList.push(ele.alternativeEmp.name.replace(",", "") + '\n\n');
        }
        if(ele.leaveType.name)
        {
          this.LeaveleaveTypeList.push(ele.leaveType.name.replace(",", "") + '\n\n');
        }
        if(ele.status)
        {
          this.LeaveStatuslList.push(ele.status.replace(",", "") + '\n\n');
        }
      });
      rowLeave = [element.employeeName, element.professionName,  this.LeaveStartDatelList, this.LeaveDayslList, this.LeaveAlternativeEmployeelList, this.LeaveleaveTypeList, this.LeaveStatuslList];
      rowsLeave.push(rowLeave);
    });
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
      rowAttendance = [element.employeeName, this.arrivalList, this.departureList];
      rowsAttendance.push(rowAttendance);
      console.log("arrivalList", this.arrivalList)
    });
//    (doc as any).autoTable(colLeave,rowsLeave,{startY: typeof  (doc as any).autoTable.previous.finalY === 'undefined' ? 50 :  (doc as any).autoTable.previous.finalY + 20, styles: { font: 'ARIALUNI' } });
    (doc as any).autoTable({
      head: headLeaves,
      body: rowsLeave,
      margin: { top: 40 },
      styles: { font: 'ARIALUNI'}
    });
     
    
    //(doc as any).autoTable([{colExcuses2},{colExcuses}],rowsExcuse,{startY: typeof  (doc as any).autoTable.previous.finalY === 'undefined' ? 85 :  (doc as any).autoTable.previous.finalY + 20, styles: { font: 'ARIALUNI' } });
   
    (doc as any).autoTable({
    styles: { font: 'ARIALUNI' },
    head: headExecuses,
    body: rowsExcuse
  });
   
   
   
  //  (doc as any).autoTable(colAttendance, rowsAttendance,{startY: typeof  (doc as any).autoTable.previous.finalY === 'undefined' ? 140 :  (doc as any).autoTable.previous.finalY + 20, styles: { font: 'ARIALUNI'} });
  (doc as any).autoTable({
    styles: { font: 'ARIALUNI' },
    head: headAttendance,
    body: rowsAttendance
  });


     doc.save('Emp.pdf');
  }
  Filter()
  {
    if ((this.ProfID != undefined || this.ProfID != 0) && (this.EmpID == undefined || this.EmpID == 0)) {
      this.ExcuseService.GetExcusesByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredExcuses = data },
        error => console.log(error)
      )
      this.Leaveservice.GetLeaveRequestsByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredLeaves = data },
        error => console.log(error)
      )
      this.attensanceService.GetAttendancesByProfessionId(this.ProfID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if ((this.EmpID != undefined || this.EmpID != 0)) {
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
      this.attensanceService.GetAttendancesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.ProfID != 0 || this.EmpID != 0 && ((this.EmpReportObj.startdate == this.exDate && this.EmpReportObj.endDate == this.exDate)||(this.EmpReportObj.startdate == this.AttendDate && this.EmpReportObj.endDate == this.AttendDate))) {
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
      this.attensanceService.GetAttendancesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }
    if (this.EmpReportObj.startdate != this.exDate && this.EmpReportObj.endDate != this.exDate) {
      this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.EmpReportObj.startdate && ex.date < this.EmpReportObj.endDate);
      this.FilteredLeaves = this.AllLeaves.filter(ex => ex.start > this.EmpReportObj.startdate && ex.start < this.EmpReportObj.endDate);
      this.attensanceService.GetAttendancesByDate(this.EmpReportObj.startdate, this.EmpReportObj.endDate).subscribe(res =>
        this.FilteredAttendance = res
      )
    }



    var doc = new jsPDF();

  var data = [
    {name: "Bar", amount: 1200}, 
    {name: "Zap", amount: 200}, 
    {name: "Foo", amount: 320}];
    
  var total = data.reduce((sum, el) => sum + el.amount, 0);




//   let head = [
//     [
//       {content: `Total = ${total}`, colSpan: 2, styles: { fillColor: [239, 154, 154] }},
//        // {content: 'Data', colSpan: 2, styles: {halign: 'center', fillColor: [22, 160, 133]}}
//     ],
//     ['ID', 'Name', 'Email', 'City', 'Sum'],
// ];

//     (doc as any).autoTable({
//     head: head,//[['Concept', 'Amount']],
//     body: [...data.map(el => [el.name, el.amount])]
//   });

//   doc.save("table.pdf");
  }
}
