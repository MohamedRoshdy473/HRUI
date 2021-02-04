import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UniversitiesService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllUniversities() {
    return this.httpclient.get(`${environment.ApiURL}/Universities`, this.httpHeader)
  };
  getUniversityByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Universities/` + Id, this.httpHeader);
  }
  addUniversity(University) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Universities`, University, httpOptions);
  }

  editUniversity(id, University) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Universities/` + id, University, httpOptions);
  }
  deleteUniversity(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Universities/` + id, this.httpHeader);
  }
}
