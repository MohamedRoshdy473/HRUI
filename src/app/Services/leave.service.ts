import {observable} from '../../../node_modules/rxjs/src/internal/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Data_Types/employee';
import { map, filter, switchMap } from 'rxjs/operators';
import { LeaveRequest } from '../Data_Types/leave-request';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private httpclient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};

  AllLeaves()
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests`,this.httpHeader);

  }
  getLeaveByID(id)
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/`+id,this.httpHeader);
  }
  getrequestLeaveByID(id)
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/getLeaveRequestfiles/`+id,this.httpHeader);
  }
  addLeave(LeaveRequest)
  {
    return this.httpclient.post(`${environment.ApiURL}/LeaveRequests/AddLeaveRequest`,LeaveRequest,this.httpHeader);
  }
  GetLeaveTypes()
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/GetLeaveTypes`,this.httpHeader);
  }
  ApprovedLeaves():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/ApprovedLeaves`,this.httpHeader)
  }
  DisApprovedLeaves():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/DisApprovedLeaves`,this.httpHeader)
  }
  PendingLeaves():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/PendingLeaves`,this.httpHeader)
  }
  approve(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/AcceptLeave/`+id,this.httpHeader)
  }
  disapprove(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/RejectLeave/`+id,this.httpHeader)
  }
  PreviousExcuses():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/LeaveRequests/PreviousLeaves`,this.httpHeader)
  }
  delete(id)
  {
    return this.httpclient.delete(`${environment.ApiURL}/LeaveRequests/`+id,this.httpHeader)
  }
}
