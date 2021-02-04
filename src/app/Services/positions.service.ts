import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllPosition() {
    return this.httpclient.get(`${environment.ApiURL}/Positions`, this.httpHeader)
  };
  getPositionByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Positions/` + Id, this.httpHeader);
  }
  addPosition(Position) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Positions`, Position, httpOptions);
  }

  editPosition(id, Position) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Positions/` + id, Position, httpOptions);
  }
  deletePosition(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Positions/` + id, this.httpHeader);
  }
}
