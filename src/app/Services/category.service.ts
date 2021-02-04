import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllcategory() {
    return this.httpclient.get(`${environment.ApiURL}/NeedsCategories`, this.httpHeader)
  };
  getCategoryByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/NeedsCategories/` + Id, this.httpHeader);
  }
  addCategory(category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/NeedsCategories`, category, httpOptions);
  }

  editCategory(id, category) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/NeedsCategories/` + id, category, httpOptions);
  }
  deleteCategory(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/NeedsCategories/` + id, this.httpHeader);
  }
}