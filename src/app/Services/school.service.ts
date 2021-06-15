import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllSchool() {
    return this.httpclient.get(`${environment.ApiURL}/Schools`, this.httpHeader)
  };
  getSchoolByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Schools/` + Id, this.httpHeader);
  }
  addSchool(School) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Schools`, School, httpOptions);
  }

  editSchool(id, School) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Schools/` + id, School, httpOptions);
  }
  deleteSchool(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Schools/` + id, this.httpHeader);
  }
}
