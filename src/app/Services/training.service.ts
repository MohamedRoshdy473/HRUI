import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetAllTrainings() {
    return this.httpclient.get(`${environment.ApiURL}/Training`, this.httpHeader)
  };
  GetTrainingByID(TrainingID) {
    return this.httpclient.get(`${environment.ApiURL}/Training/` + TrainingID, this.httpHeader);
  }
  GetTrainingObjByprofessionID(professionID){
    return this.httpclient.get(`${environment.ApiURL}/Training/GetTrainingByprofessionID/` + professionID, this.httpHeader);
  }

  
  GetCoursesByTrainingTypeID(trainingTypeID){
    return this.httpclient.get(`${environment.ApiURL}/Training/GetCoursesByTrainingTypeID/` + trainingTypeID, this.httpHeader);
  }

  
  GetTrainingTypesByprofessionID(professionID){
    return this.httpclient.get(`${environment.ApiURL}/Training/GetTrainingTypesByprofessionID/` + professionID, this.httpHeader);
  }

  GetCertified()
  {
    return this.httpclient.get(`${environment.ApiURL}/Training/Certified`, this.httpHeader);
  }
  GetPending()
  {
    return this.httpclient.get(`${environment.ApiURL}/Training/Pending`, this.httpHeader);
  }
  Certified(id)
  {
    return this.httpclient.get(`${environment.ApiURL}/Training/Certified/`+id, this.httpHeader);
  }
  AddTraining(Training) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Training`, Training, httpOptions)
  }
  EditTraining(Id, Training) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Training/` + Id, Training, httpOptions)
  }
  DeleteTraining(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Training/` + Id, this.httpHeader);
  }
}
