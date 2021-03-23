import { Component, NgZone, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Employee } from '../../../Data_Types/employee';
import { EmployeeService } from '../../../Services/employee.service';
import { Attend } from '../../../Data_Types/attend';
import { DatePipe } from '@angular/common';
import { timestamp, Timestamp } from 'rxjs/internal/operators/timestamp';
import { AttendanceService } from '../../../Services/attendance.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance-in.component.html',
  styleUrls: ['./attendance-in.component.css']
})
export class AttendanceINComponent implements OnInit {

  public timeNow= new Date();
  public now: Date = new Date();
  AllEmployees: any;
  AttendINEmployees: any;
  Attend:Attend;
  getimage: string;

  constructor(private empService: EmployeeService, private zone: NgZone, 
    private primengConfig: PrimeNGConfig,private datePipe:DatePipe,private AttService:AttendanceService) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
    this.Attend={id:0,arrival:new Date(),daparture:new Date(),employeeID:0,
      time:{hours:0,minutes:0},profession:'',code:0,name:'',existInSource:true};
    this.AttendINEmployees = [];

  }

  ngOnInit(): void {
    this.getimage = environment.getImageByName

    this.empService.GetAllEmployees().subscribe(
      emps => {this.AllEmployees = emps,
        this.AllEmployees.forEach(element => {
          element.existInSource=true
        });
      }
      );
    this.primengConfig.ripple = true;
    this.AttService.getTodayAttended().subscribe(
      data=>{console.log(data),this.AttendINEmployees=data},
      error=>console.log(error)
    )
  }
  moved(event)
  {
    console.log(event[0]);
    event[0].existInSource=false;
    event[0].time=this.now;
    console.log(this.AttendINEmployees)
    var data={
      EmployeeID:event[0].id,
      Arrival:new Date(Date.now())
    }
    console.log(data)
    this.AttService.MakeInAttend(data).subscribe(
      data=>console.log(data),
      error=>console.log(error)
    );
  }

}
