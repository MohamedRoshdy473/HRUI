import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubCategoryServiceService {

  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllsubcategory() {
    return this.httpclient.get(`${environment.ApiURL}/SubCategories`, this.httpHeader)
  };
  getsubCategoryByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/SubCategories/` + Id, this.httpHeader);
  }

  getsubCategoryByCategoryID(categoryId) {
    console.log(categoryId);
    return this.httpclient.get(`${environment.ApiURL}/SubCategories/GetSubCategoriesByCategoryId/` + categoryId, this.httpHeader);
  }
  addsubCategory(subcategory) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/SubCategories`, subcategory, httpOptions);
  }

  editsubCategory(id, subcategory) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/SubCategories/` + id, subcategory, httpOptions);
  }
  deletesubCategory(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/SubCategories/` + id, this.httpHeader);
  }
}
