import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { IUser } from 'src/app/Data_Types/iuser'
import { Router } from '@angular/router';
import { Attend } from '../Data_Types/attend';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  httpOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "bearer " + localStorage.getItem('token')
      })};
  constructor(private httpclient: HttpClient,private router : Router) { }

  MakeInAttend(attend)
  {
    return this.httpclient.post(`${environment.ApiURL}/Attendances`,attend,this.httpOptions)
  }

  getTodayAttended()
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/getTodayAttendedIN`,this.httpOptions)
  }
  getTodayAttendedOut()
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/getTodayAttendedOUT`,this.httpOptions)
  }
  MakeOUTAttend(attend,id)
  {
    return this.httpclient.put(`${environment.ApiURL}/Attendances/`+id,attend,this.httpOptions)
  }


  GetAttendances()
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/GetAttendances`,this.httpOptions)
  }
  GetAttendancesByProfessionId(ProfessionId)
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/GetAttendancesByProfessionId/`+ProfessionId,this.httpOptions)
  }
  GetAttendancesByProfessionIdAndEmployeeId(ProfessionId,EmployeeId)
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/GetAttendancesByProfessionIdAndEmployeeId/`+ProfessionId+'/'+EmployeeId,this.httpOptions)
  }
  GetAttendancesByProfessionIdAndEmployeeIdAndDate(ProfessionId,EmployeeId,startDate,endDate)
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/GetAttendancesByProfessionIdAndEmployeeIdAndDate/`+ProfessionId+'/'+EmployeeId+'/'+startDate+'/'+endDate,this.httpOptions)
  }
  GetAttendancesByDate(startDate,endDate)
  {
    return this.httpclient.get(`${environment.ApiURL}/Attendances/GetAttendancesByDate/`+startDate+'/'+endDate,this.httpOptions)
  }
}
