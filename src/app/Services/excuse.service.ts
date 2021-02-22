import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InnerSubscriber } from 'rxjs/internal/InnerSubscriber';
import { IUser } from 'src/app/Data_Types/iuser'
import { Excuse } from '../Data_Types/excuse';

@Injectable({
  providedIn: 'root'
})
export class ExcuseService {

  constructor(private httpclient: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      "Authorization": "bearer " + localStorage.getItem('token')
    })
  };
  addExcuse(excuse: Excuse) :Observable<any> {
    console.log(excuse)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };

    return this.httpclient.post(`${environment.ApiURL}/Excuses`, excuse, httpOptions);
  }

  GetExcusesByManager():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/GetExcusesByManager`,this.httpOptions)
  }
  AllExcuses():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses`,this.httpOptions)
  }
  GetExcuseByEmployeeId(EmployeeId):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/GetExcuseByEmployeeId/`+EmployeeId,this.httpOptions)
  }
  GetAllExcuseForEmployeeId(EmployeeId):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/GetAllExcuseForEmployeeId/`+EmployeeId,this.httpOptions)
  }
  getexcuseByID(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/`+id,this.httpOptions)
  }
  Update(Excuse,id):Observable<any>
  {
    return this.httpclient.put(`${environment.ApiURL}/Excuses/`+id,Excuse,this.httpOptions)
  }
  ApprovedExcuses():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/ApprovedExcuses`,this.httpOptions)
  }
  ApprovedExcusesByManager():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/ApprovedExcusesByManager`,this.httpOptions)
  }
  DisApprovedExcuses():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/DisApprovedExcuses`,this.httpOptions)
  }
    DisApprovedExcusesByManager():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/DisApprovedExcusesByManager`,this.httpOptions)
  }
  PendingExcusesByManager():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/PendingExcuses`,this.httpOptions)
  }
  PendingExcusesByHR():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/Excuses/PendingExcusesByHR`,this.httpOptions)
  }
  approve(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/AcceptExcuse/`+id,this.httpOptions)
  }
  disapprove(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/RejectExcuse/`+id,this.httpOptions)
  }
  PreviousExcuses():Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/Excuses/PreviousExcuses`,this.httpOptions)
  }
  delete(id):Observable<any>
  {
    return this.httpclient.delete(`${environment.ApiURL}/Excuses/`+id,this.httpOptions)
  }
}
