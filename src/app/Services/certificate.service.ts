import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  GetCertificatesByEmployee(employeeID)
  {
    return this.httpclient.get(`${environment.ApiURL}/Certificates/GetCertificatesByEmployeeID/` + employeeID, this.httpHeader);

  }
  getAllCertificates() {
    return this.httpclient.get(`${environment.ApiURL}/Certificates`, this.httpHeader)
  };
  geCertificateByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Certificates/` + Id, this.httpHeader);
  }
  addCertificate(Certificate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Certificates`, Certificate, httpOptions);
  }

  editCertificate(id, Certificate) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Certificates/` + id, Certificate, httpOptions);
  }
  deleteCertificate(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Certificates/` + id, this.httpHeader);
  }
}
