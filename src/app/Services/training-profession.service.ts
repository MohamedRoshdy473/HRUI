import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingProfessionService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllTrainingProfessions() {
    return this.httpclient.get(`${environment.ApiURL}/TrainingProfessions`, this.httpHeader)
  };
  GetTrainingProfessionByID(TrainingProfessionID) {
    return this.httpclient.get(`${environment.ApiURL}/TrainingProfessions/` + TrainingProfessionID, this.httpHeader);
  }

  GetTrainingAndCourseByProfessionId(ProfessionId) {
    console.log(ProfessionId);
    return this.httpclient.get(`${environment.ApiURL}/TrainingProfessions/GetTrainingAndCourseByProfessionId/` + ProfessionId, this.httpHeader);
  }

  GetTrainingAndCourseNotByProfessionId(ProfessionId) {
    console.log(ProfessionId);
    return this.httpclient.get(`${environment.ApiURL}/TrainingProfessions/GetTrainingAndCourseNotByProfessionId/` + ProfessionId, this.httpHeader);
  }
  AddTrainingProfession(TrainingProfession) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/TrainingProfessions`, TrainingProfession, httpOptions)
  }
  EditTrainingProfession(Id,TrainingProfession) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    
    return this.httpclient.put(`${environment.ApiURL}/TrainingProfessions/` + Id, TrainingProfession, httpOptions)
  }
  DeleteTrainingProfession(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/TrainingProfessions/` + Id, this.httpHeader);
  }
}