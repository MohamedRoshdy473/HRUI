import { Component, OnInit } from '@angular/core';
import {LeaveService} from 'src/app/Services/leave.service'
import 'jspdf-autotable';
import jsPDF from 'jspdf'
import { DatePipe } from '@angular/common';
import { Excuse } from '../../Data_Types/excuse'
import { EmployeeService } from '../../Services/employee.service';
import { ProfessionService } from '../../Services/profession.service';
@Component({
  selector: 'app-report-leaves',
  templateUrl: './report-leaves.component.html',
  styleUrls: ['./report-leaves.component.css']
})
export class ReportLeavesComponent implements OnInit {
  AllLeaves: any[];
  FilteredLeaves:any;
  AllEmployeesByProfession: any;
  AllProfessions: any;
  LeaveObj:any;
  constructor(private Leaveservice: LeaveService,private professionService:ProfessionService, private datePipe: DatePipe,private EmpService:EmployeeService) { }

  ngOnInit(): void {
    this.LeaveObj = {
      Comment: '', AlternativeAddress: '', Status: 'pending',
      AlternativeEmpID: 0, Days: 0, employeeId: 0, LeaveTypeID: 0, startdate: new Date(Date.now()),endDate:new Date()};

      this.Leaveservice.AllLeaves().subscribe(
        data => { this.AllLeaves = data,this.FilteredLeaves=data,
          console.log("AllLeaves",this.AllLeaves)
        },
        error => console.log(error)
      );
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
  getReport() {
    const totalPagesExp = "{total_pages_count_string}";
    var doc = new jsPDF('l');
    var img = new Image()
    img.src = 'assets/images/logo.jpeg'
    doc.addImage(img, 'png', 10, 10, 23, 23);
    doc.text("AlMostakbal Technology", 50, 25, { "align": "left" });
    doc.text("List Execuses", 10, 45, { "align": "left" });
    var col = ["Id", "Employee Name", "Profession Name", "Date", "Alternative Employee", "Leave Type Name", "Status"];
    var rows = [];
    var row = [];
    //var type = this.Allexcuses.reduce((typeName, el) =>  el.employeeName,'Ekram');
    console.log("this.LeaveObj.professionID",this.LeaveObj.employeeId)
    var type = this.AllLeaves.filter(ex => ex.professionID == this.LeaveObj.professionID || ex.employeeId == this.LeaveObj.employeeId
      ||(ex.date>this.LeaveObj.startdate && ex.date<this.LeaveObj.endDate));
    console.log("type", type);
    if(type.length==0)
    {
      this.AllLeaves.forEach(element => {
        var LeaveDate = this.datePipe.transform(element.start, "dd/MM/yyyy");
        row = [element.id, element.employeeName, element.profession, LeaveDate,element.alternativeEmp,element.leaveTypeName,element.status];
        rows.push(row);
      });
    }
    if(type.length!=0){
      type.forEach(element => {
        var ExcuseDate = this.datePipe.transform(element.date, "dd/MM/yyyy");
        row = [element.id, element.employeeName, element.professionName, ExcuseDate,element.time,element.hours,element.approved];
        rows.push(row);
      });
    }

    row = [type, { startY: 50, styles: { font: 'ARIALUNI', colSpan: 8 } }];
    (doc as any).autoTable(col, rows, { startY: 50 });

    doc.save('leave.pdf');
  }
  Filter() {
    var type2 = this.AllLeaves.filter(ex => ex.professionID == this.LeaveObj.professionID || ex.employeeId == this.LeaveObj.employeeId
      ||(ex.date>this.LeaveObj.startdate && ex.date<this.LeaveObj.endDate));
      this.FilteredLeaves=type2;
    }
}
