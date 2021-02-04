import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllLeavesType() {
    return this.httpclient.get(`${environment.ApiURL}/LeavesTypes`, this.httpHeader)
  };
  GetAllLeavesTypeByID(LeavesTypeID) {
    return this.httpclient.get(`${environment.ApiURL}/LeavesTypes/` + LeavesTypeID, this.httpHeader);
  }
  AddLeavesType(LeavesType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/LeavesTypes`, LeavesType, httpOptions)
  }
  EditLeavesType(Id, LeavesType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/LeavesTypes/` + Id, LeavesType, httpOptions)
  }
  DeleteLeavesType(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/LeavesTypes/` + Id, this.httpHeader);
  }
}
