import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationProfessionService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetEvaluationProfession() {
    return this.httpclient.get(`${environment.ApiURL}/EvaluationProfession`, this.httpHeader)
  };
  GetEvaluationProfessionByID(EvalutaionProfessionID) {
    return this.httpclient.get(`${environment.ApiURL}/EvaluationProfession/` + EvalutaionProfessionID, this.httpHeader);
  }

  GetEvaluationByProfessionId(ProfessionId) {
    console.log(ProfessionId);
    return this.httpclient.get(`${environment.ApiURL}/EvaluationProfession/GetEvaluationByProfession/` + ProfessionId, this.httpHeader);
  }
  
  GetEvaluationTypeByProfessionId(ProfessionId) {
    console.log(ProfessionId);
    return this.httpclient.get(`${environment.ApiURL}/EvaluationProfession/GetEvaluationTypeByProfession/` + ProfessionId, this.httpHeader);
  }


  
  GetEvaluationNotByProfessionId(ProfessionId) {
    console.log(ProfessionId);
    return this.httpclient.get(`${environment.ApiURL}/EvaluationProfession/GetEvaluationTypeNotByProfession/` + ProfessionId, this.httpHeader);
  }
  AddEvaluationProfession(EvaluationProfession) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/EvaluationProfession`, EvaluationProfession, httpOptions)
  }
  EditEvaluationProfession(Id, EvaluationProfession) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/EvaluationProfession/` + Id, EvaluationProfession, httpOptions)
  }
  DeleteEvaluationProfession(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/EvaluationProfession/` + Id, this.httpHeader);
  }
}