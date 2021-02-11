import { Injectable } from '@angular/core';
import {observable} from '../../../node_modules/rxjs/src/internal/symbol/observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeDocuments } from '../Data_Types/EmployeeDocuments';
import { map, filter, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDocumentsService {
  constructor(private httpclient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};
  getAllEmployeeDocuments()
  {
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    return this.httpclient.get(`${environment.ApiURL}/EmployeeDocuments/`,httpHeader)
  }
 
  AddEmployeeDocument(empDocument:EmployeeDocuments[]):Observable<EmployeeDocuments[]>
  {
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
    })};
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
        })};
    return this.httpclient.post<EmployeeDocuments[]>(`${environment.ApiURL}/EmployeeDocuments/`,empDocument,httpOptions);
  }

  GetEmployeeDocmentsByEmployeeId(employeeId: Number): Observable<any> {
    return this.httpclient.get<EmployeeDocuments[]>(`${environment.GetEmployeeDocumentsByEmployeeId}${employeeId}`, this.httpHeader);
  }
  deletedocument(id:number):Observable<any>{ 
    return this.httpclient.delete<any>(`${environment.ApiURL}/EmployeeDocuments/${id}`,this.httpHeader);
  }
}
