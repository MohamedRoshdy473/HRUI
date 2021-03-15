import { Component, OnInit } from '@angular/core';
import { ExcuseService } from 'src/app/Services/excuse.service'
import 'jspdf-autotable';
import jsPDF from 'jspdf'
import { DatePipe } from '@angular/common';
import { Excuse } from '../../Data_Types/excuse'
import { EmployeeService } from '../../Services/employee.service';
import { ProfessionService } from '../../Services/profession.service';
import { date } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-report-excuse',
  templateUrl: './report-excuse.component.html',
  styleUrls: ['./report-excuse.component.css']
})
export class ReportExcuseComponent implements OnInit {
  Allexcuses: any[];
  FilteredExcuses:any;
  NewExcuse:any;
  AllEmployeesByProfession: any;
  AllProfessions: any;
  Idtranslate:any
  emptranslate: any;
  Professiontranslate:any;
  Datetranslate:any;
  Timetetranslate:any;
  Hourstranslate:any;
  Statustranslate:any;
  Excusestranslate: any;
  ALMostakbaltranslate: any;
  constructor(private translate: TranslateService,private ExcuseService: ExcuseService,private professionService:ProfessionService, private datePipe: DatePipe,private EmpService:EmployeeService) { }

  ngOnInit(): void {
    this.NewExcuse = {employeeId:0, approved: "pending", employeeName: '', id: 0, profession: '', startdate: new Date(Date.now()),endDate:new Date(), comment: '', hours: 0, time: { hours: 0, minutes: 0 } };
    this.Allexcuses = []
    this.ExcuseService.AllExcuses().subscribe(
      data => {
        this.Allexcuses = data; 
        this.FilteredExcuses=data
        console.log("data", data)
      });
      this.professionService.getAllProfession().subscribe(
        data=>{this.AllProfessions=data,console.log("AllProfessions",data)},
        error => console.log(error)
      );
  }
  onChange(ProfessionId) {
    this.EmpService.GetAllEmployeesByProfession(ProfessionId).subscribe(
      data => { this.AllEmployeesByProfession = data },
      error => console.log(error)
    )
  }
  DownloadReport() {
    this.getReport();
  }
  typeName: any;
  getReport() {
    this.translate.get(['HR.AL-Mostakbal','HR.Excuses','HR.Id','HR.Employee Name','HR.Profession Name','HR.Date','HR.Time','HR.Hours','HR.Status']).subscribe((data:any)=> {
      console.log("Translated data",data);
      this.ALMostakbaltranslate=data['HR.AL-Mostakbal']
      this.Excusestranslate=data['HR.Excuses']
      this.Idtranslate=data['HR.Id']
      this.emptranslate=data['HR.Employee Name']
      this.Professiontranslate=data['HR.Profession Name']
      this.Datetranslate=data['HR.Date']
      this.Timetetranslate=data['HR.Time']
      this.Hourstranslate=data['HR.Hours']
      this.Statustranslate=data['HR.Status']

      console.log("emptranslate data",this.emptranslate);

     });

    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('l');
    doc.addFont("../assets/ARIALUNI.TTF", "ARIALUNI", "normal");
    doc.setFont('ARIALUNI');

    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text(this.ALMostakbaltranslate, 50, 25, { "align": "left" });
    doc.text( this.Excusestranslate, 10, 45, { "align": "left" });

    var col = [this.Idtranslate, this.emptranslate, this.Professiontranslate, this.Datetranslate, this.Timetetranslate, this.Hourstranslate, this.Statustranslate];
    var rows = [];
    var row = [];
    //var type = this.Allexcuses.reduce((typeName, el) =>  el.employeeName,'Ekram');
    console.log("this.NewExcuse.employeeId",this.NewExcuse.employeeId)
    var type = this.Allexcuses.filter(ex => ex.professionID == this.NewExcuse.professionID || ex.employeeId == this.NewExcuse.employeeId
      ||(ex.date>this.NewExcuse.startdate && ex.date<this.NewExcuse.endDate));
    console.log("type", type);
    if(type.length==0)
    {
      row = [type,{ startY: 50, styles: { font: 'ARIALUNI' , colSpan:8} }]
      this.Allexcuses.forEach(element => {
        var ExcuseDate = this.datePipe.transform(element.date, "dd/MM/yyyy");
        row = [element.id, element.employeeName, element.professionName, ExcuseDate,element.time,element.hours,element.approved];
        rows.push(row);
      });
    }
    if(type.length!=0){
      row = [type,{ startY: 50, styles: { font: 'ARIALUNI' , colSpan:8} }]
      type.forEach(element => {
        var ExcuseDate = this.datePipe.transform(element.date, "dd/MM/yyyy");
        row = [element.id, element.employeeName, element.professionName, ExcuseDate,element.time,element.hours,element.approved];
        rows.push(row);
      });
    }
    // for (let index = 0; index < this.Allexcuses.length; index++) {
    //   const element = this.Allexcuses[index];
    //   var ExcuseDate = this.datePipe.transform(element.date, "dd/MM/yyyy");
    //   row = [element.id, element.employeeName, element.professionName, ExcuseDate, element.time, element.hours, element.approved];
    //   console.log("row", row)
    //   rows.push(row);
    // }
   
    (doc as any).autoTable(col, rows, { startY: 50, styles: { font: 'ARIALUNI' } });
    
    doc.save('execuse.pdf');
  }
  Filter() {
    var type2 = this.Allexcuses.filter(ex => ex.professionID == this.NewExcuse.professionID ||(ex.professionID == this.NewExcuse.professionID && ex.employeeId == this.NewExcuse.employeeId) 
      ||(ex.date>this.NewExcuse.startdate && ex.date<this.NewExcuse.endDate));
      this.FilteredExcuses=type2;
    }
}
