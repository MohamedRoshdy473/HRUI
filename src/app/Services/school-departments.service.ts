import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SchoolDepartmentsService {
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllSchoolDepartment() {
    return this.httpclient.get(`${environment.ApiURL}/SchoolDepartments`, this.httpHeader)
  };
  getSchoolDepartmentByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/SchoolDepartments/` + Id, this.httpHeader);
  }
  GetAllSchoolDepartmentsBySchoolId(SchoolId) {
    return this.httpclient.get(`${environment.ApiURL}/SchoolDepartments/GetAllSchoolDepartmentsBySchoolId/` + SchoolId, this.httpHeader);
  }
  addSchoolDepartment(SchoolDepartment) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/SchoolDepartments`, SchoolDepartment, httpOptions);
  }

  editSchoolDepartment(id, SchoolDepartment) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/SchoolDepartments/` + id, SchoolDepartment, httpOptions);
  }
  deleteSchoolDepartment(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/SchoolDepartments/` + id, this.httpHeader);
  }
}
