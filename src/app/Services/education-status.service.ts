import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EducationStatusService {
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllEducationStatus() {
    return this.httpclient.get(`${environment.ApiURL}/EducationStatus`, this.httpHeader)
  };
  getEducationStatusByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/EducationStatus/` + Id, this.httpHeader);
  }
  addEducationStatus(EducationStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/EducationStatus`, EducationStatus, httpOptions);
  }

  editEducationStatus(id, EducationStatus) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/EducationStatus/` + id, EducationStatus, httpOptions);
  }
  deleteEducationStatus(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/EducationStatus/` + id, this.httpHeader);
  }
}
