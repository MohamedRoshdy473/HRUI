import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PositionLevelService {

 
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllPositionLevel() {
    return this.httpclient.get(`${environment.ApiURL}/PositionLevels`, this.httpHeader)
  };
  getPositionLevelByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/PositionLevels/` + Id, this.httpHeader);
  }
  addPositionLevel(PositionLevel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/PositionLevels`, PositionLevel, httpOptions);
  }

  editPositionLevel(id, PositionLevel) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/PositionLevels/` + id, PositionLevel, httpOptions);
  }
  deletePositionLevel(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/PositionLevels/` + id, this.httpHeader);
  }
}
