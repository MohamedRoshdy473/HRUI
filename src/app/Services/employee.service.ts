import {observable} from '../../../node_modules/rxjs/src/internal/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Data_Types/employee';
import { map, filter, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient: HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};
  

  getProfession()
  {
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    return this.httpclient.get(`${environment.ApiURL}/Professions`,httpHeader)
  }
  AddEmployee(emp:Employee)
  {
    //console.log(emp);
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.post(`${environment.employees}`,emp,httpOptions);
  }
  GetAllEmployees(): Observable<Employee[]>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //"Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get<Employee[]>(`${environment.ApiURL}/Employees`,httpOptions);
  }
  GetImageByName(imageName: string): Observable<any> {
    return this.httpclient.get<any>(`${environment.getImageByName}${imageName}`, this.httpHeader);
  }
  GetEmployee (id): Observable<Employee>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get<Employee>(`${environment.ApiURL}/Employees/`+id,httpOptions);
  }
  UpdateEmployee(id,emp)
  {
    //console.log(emp);
    const httpHeader={headers: new HttpHeaders({
      'content-type':'application/json',
      'Accept': '*/*'
         
    })};
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.put(`${environment.ApiURL}/Employees/`+id,emp,httpHeader);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = `${environment.employees}UploadImage`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpclient
      .post(endpoint, formData).pipe(
      map(() => { return true; }));
  }

  EmployeeByProfession(EmpId:number)
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get(`${environment.ApiURL}/Employees/EmployeeByProfession/`+EmpId,httpOptions);
  }
  GetAllEmployeesByProfession(id):Observable<any>
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.get<any>(`${environment.ApiURL}/Employees/GetAllEmployeesByProfession/`+id,this.httpHeader);
  }
  delete(id)
  {
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpclient.delete(`${environment.ApiURL}/Employees/`+id,this.httpHeader);
  }
}




