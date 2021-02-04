import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationTypeService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllEvalutaionType() {
    return this.httpclient.get(`${environment.ApiURL}/EvaluationTypes`, this.httpHeader)
  };
  GetAllEvalutaionTypeByID(EvalutaionTypeID) {
    return this.httpclient.get(`${environment.ApiURL}/EvaluationTypes/` + EvalutaionTypeID, this.httpHeader);
  }
  AddEvalutaionType(EvaluationType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/EvaluationTypes`, EvaluationType, httpOptions)
  }
  EditEvaluationType(Id, EvaluationType) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/EvaluationTypes/` + Id, EvaluationType, httpOptions)
  }
  DeleteEvaluationType(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/EvaluationTypes/` + Id, this.httpHeader);
  }
}
