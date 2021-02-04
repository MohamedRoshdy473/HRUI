import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllFaculties() {
    return this.httpclient.get(`${environment.ApiURL}/Faculty`, this.httpHeader)
  };
  getFacultyByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Faculty/` + Id, this.httpHeader);
  }
  GetFacultiesByUniversityId(UniversityId:number) {
    return this.httpclient.get(`${environment.ApiURL}/Faculty/GetFacultiesByUniversityId/` + UniversityId, this.httpHeader);
  }
  addFaculty(Faculty) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Faculty`, Faculty, httpOptions);
  }

  editFaculty(id, Faculty) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Faculty/` + id, Faculty, httpOptions);
  }
  deleteFaculty(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Faculty/` + id, this.httpHeader);
  }
}
