import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfessionService {
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllProfession() {
    return this.httpclient.get(`${environment.ApiURL}/Professions`, this.httpHeader)
  };
  getProfessionByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Professions/` + Id, this.httpHeader);
  }
  addProfession(Profession) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Professions`, Profession, httpOptions);
  }

  editProfession(id, Profession) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Professions/` + id, Profession, httpOptions);
  }
  deleteProfession(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Professions/` + id, this.httpHeader);
  }
}
