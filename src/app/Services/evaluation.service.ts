import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllEvaluations() {
    return this.httpclient.get(`${environment.ApiURL}/Evaluation`, this.httpHeader)
  };
  GetEvaluationID(EvalutaionID) {
    return this.httpclient.get(`${environment.ApiURL}/Evaluation/` + EvalutaionID, this.httpHeader);
  }

  GetEvaluationByemployeeID(employeeID) {
    return this.httpclient.get(`${environment.ApiURL}/Evaluation/GetEvaluationByEmployeeID/` + employeeID, this.httpHeader);
  }
  GetEvaluationObjByEmployeeID(employeeID){
    return this.httpclient.get(`${environment.ApiURL}/Evaluation/GetEvaluationObjByEmployeeID/` + employeeID, this.httpHeader);
  }

  AddEvalutaion(Evaluation) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Evaluation`, Evaluation, httpOptions)
  }
  EditEvaluation(Id, Evaluation) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Evaluation/` + Id, Evaluation, httpOptions)
  }
  DeleteEvaluation(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Evaluation/` + Id, this.httpHeader);
  }
}
