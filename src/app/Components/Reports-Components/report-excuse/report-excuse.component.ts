import { Component, OnInit } from '@angular/core';
import { ExcuseService } from 'src/app/Services/excuse.service'
import 'jspdf-autotable';
import jsPDF from 'jspdf'
import { DatePipe } from '@angular/common';
import { Excuse } from 'src/app/Data_Types/excuse'
import { EmployeeService } from 'src/app/Services/employee.service';
import { ProfessionService } from 'src/app/Services/profession.service';
import { date } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-report-excuse',
  templateUrl: './report-excuse.component.html',
  styleUrls: ['./report-excuse.component.css']
})
export class ReportExcuseComponent implements OnInit {
  Allexcuses: any[];
  FilteredExcuses: any;
  NewExcuse: any;
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
  lang: string;
  EmpID: number=0
  ProfID: number
  //type: any
  exDate: any;
  ExcusesDatelList: any
  ExcusesTimelList: any
  ExcusesHourlList: any
  ExcusesStatuslList: any
  constructor(private translate: TranslateService, private ExcuseService: ExcuseService, private professionService: ProfessionService, private datePipe: DatePipe, private EmpService: EmployeeService) { }

  ngOnInit(): void {
    this.ExcusesDatelList = []
    this.ExcusesTimelList = []
    this.ExcusesHourlList = []
    this.ExcusesStatuslList = []
    this.exDate = this.datePipe.transform(new Date(), "dd/MM/yyyy")

    this.NewExcuse = { employeeId: 0, approved: "pending", employeeName: '', id: 0, profession: '', startdate: new Date(), endDate: new Date(), comment: '', hours: 0, time: { hours: 0, minutes: 0 } };
    this.Allexcuses = []
    this.ExcuseService.AllExcusesGrouped().subscribe(
      data => {
        //this.Allexcuses = data;
        this.FilteredExcuses = data
        console.log("AllExcusesGrouped", data)
      });
    this.professionService.getAllProfession().subscribe(
      data => { this.AllProfessions = data, console.log("AllProfessions", data) },
      error => console.log(error)
    );
  }
  onChange(ProfessionId) {
    console.log("ProfessionId", ProfessionId)
    this.AllEmployeesByProfession = []
    this.EmpID = 0
    this.ProfID = ProfessionId;
    this.EmpService.GetAllEmployeesByProfession(ProfessionId).subscribe(
      data => {
        this.AllEmployeesByProfession = data
      },
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
  typeName: any;
  getReport() {
    this.translate.get(['HR.AL-Mostakbal', 'HR.Excuses', 'HR.Id', 'HR.Employee Name', 'HR.Profession Name', 'HR.Date', 'HR.Time', 'HR.Hours', 'HR.Status']).subscribe((data: any) => {
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
    });
    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('l');
    this.lang = localStorage.getItem("lang");
    doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    doc.setFont('ARIALUNI');
    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text(this.ALMostakbaltranslate, 50, 25, { "align": "left" });
    doc.text(this.Excusestranslate, 10, 45, { "align": "left" });
    var col = [this.Idtranslate, this.emptranslate, this.Professiontranslate, this.Datetranslate, this.Timetetranslate, this.Hourstranslate, this.Statustranslate];
    var rows = [];
    var row = [];
    console.log("this.NewExcuse.employeeId", this.NewExcuse.employeeId);
    //Filteration
    if ((this.ProfID != undefined || this.ProfID != 0) && (this.EmpID == undefined || this.EmpID == 0)) {
      this.ExcuseService.GetExcusesByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredExcuses = data 
          this.EmpID=0},
        error => console.log(error)
      )
    }
    if ((this.EmpID != undefined || this.EmpID != 0)) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredExcuses = data
        },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 || this.EmpID != 0 && (this.NewExcuse.startdate == this.exDate && this.NewExcuse.endDate == this.exDate)) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.NewExcuse.startdate, this.NewExcuse.endDate).subscribe(
        data => {
          this.Allexcuses = data
          this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.NewExcuse.startdate && ex.date < this.NewExcuse.endDate);
        },
        error => console.log(error)
      )
    }
    if (this.NewExcuse.startdate == this.exDate && this.NewExcuse.endDate == this.exDate) {
      this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.NewExcuse.startdate && ex.date < this.NewExcuse.endDate);
    }
    // row = [ { startY: 50, styles: { font: 'ARIALUNI', colSpan: 8 } }]
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

      row = [element.id, element.employeeName, element.professionName, this.ExcusesDatelList, this.ExcusesTimelList,this.ExcusesHourlList ,this.ExcusesStatuslList ];
      rows.push(row);
    });
    (doc as any).autoTable(col, rows, { startY: 50, styles: { font: 'ARIALUNI' } });
    doc.save('execuse.pdf');
  }
  Filter() {
    //console.log("exDate", exDate)

    if ((this.ProfID != undefined || this.ProfID != 0) && (this.EmpID == undefined || this.EmpID == 0)) {
      this.ExcuseService.GetExcusesByProfessionId(this.ProfID).subscribe(
        data => { this.FilteredExcuses = data
          this.EmpID=0
         },
        error => console.log(error)
      )
    }
    if ((this.EmpID != undefined || this.EmpID != 0)) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeId(this.ProfID, this.EmpID).subscribe(
        data => {
          this.FilteredExcuses = data
        },
        error => console.log(error)
      )
    }
    if (this.ProfID != 0 || this.EmpID != 0 && (this.NewExcuse.startdate == this.exDate && this.NewExcuse.endDate == this.exDate)) {
      this.ExcuseService.GetExcusesByProfessionIdAndEmployeeIdAndDate(this.ProfID, this.EmpID, this.NewExcuse.startdate, this.NewExcuse.endDate).subscribe(
        data => {
          this.Allexcuses = data
          this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.NewExcuse.startdate && ex.date < this.NewExcuse.endDate);
        },
        error => console.log(error)
      )
    }
    if (this.NewExcuse.startdate == this.exDate && this.NewExcuse.endDate == this.exDate) {
      this.FilteredExcuses = this.Allexcuses.filter(ex => ex.date > this.NewExcuse.startdate && ex.date < this.NewExcuse.endDate);
    }
  }
}
