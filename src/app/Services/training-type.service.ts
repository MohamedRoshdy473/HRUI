import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingTypeService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllTrainingTypes() {
    return this.httpclient.get(`${environment.ApiURL}/TrainingTypes`, this.httpHeader)
  };
  GetTrainingTypeByID(TrainingTypeID) {
    return this.httpclient.get(`${environment.ApiURL}/TrainingTypes/` + TrainingTypeID, this.httpHeader);
  }
  AddTrainingType(TrainingType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/TrainingTypes`, TrainingType, httpOptions)
  }
  EditTrainingType(Id, TrainingType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/TrainingTypes/` + Id, TrainingType, httpOptions)
  }
  DeleteTrainingType(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/TrainingTypes/` + Id, this.httpHeader);
  }
}
