import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllInstructors() {
    return this.httpclient.get(`${environment.ApiURL}/Instructors`, this.httpHeader)
  };
  GetInstructorByID(InstructorID) {
    return this.httpclient.get(`${environment.ApiURL}/Instructors/` + InstructorID, this.httpHeader);
  }
  AddInstructor(Instructor) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Instructors`, Instructor, httpOptions)
  }
  EditInstructor(Id, Instructor) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Instructors/` + Id, Instructor, httpOptions)
  }
  DeleteInstructor(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Instructors/` + Id, this.httpHeader);
  }
}
