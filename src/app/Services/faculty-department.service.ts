import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacultyDepartment } from '../Data_Types/FacultyDepartment';
@Injectable({
  providedIn: 'root'
})
export class FacultyDepartmentService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllFacultyDepartments() {
    return this.httpclient.get(`${environment.ApiURL}/FacultyDepartment`, this.httpHeader)
  };
  getFacultyDepartmentByID(Id):Observable<FacultyDepartment>{
    console.log(Id);
    return this.httpclient.get<FacultyDepartment>(`${environment.ApiURL}/FacultyDepartment/` + Id, this.httpHeader);
  }
  GetFacultyDepartmentsByFacultyId(FacultyId:number) {
    return this.httpclient.get(`${environment.ApiURL}/FacultyDepartment/GetFacultyDepartmentsByFacultyId/` + FacultyId, this.httpHeader);
  }
  addFacultyDepartment(FacultyDepartment) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/FacultyDepartment`, FacultyDepartment, httpOptions);
  }

  editFacultyDepartment(id, FacultyDepartment) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/FacultyDepartment/` + id, FacultyDepartment, httpOptions);
  }
  deleteFacultyDepartment(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/FacultyDepartment/` + id, this.httpHeader);
  }
}
