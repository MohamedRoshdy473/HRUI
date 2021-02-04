import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private httpclient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'accept': '*/*'
    })
  };
  getAllCourse() {
    return this.httpclient.get(`${environment.ApiURL}/Courses`, this.httpHeader)
  };
  getCourseByID(Id) {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/Courses/` + Id, this.httpHeader);
  }
  GetCoursesByTrainingTypeID(trainingTypeID)
  {
    return this.httpclient.get(`${environment.ApiURL}/Courses/GetCoursesByTrainingTypeID/` + trainingTypeID, this.httpHeader);

  }
  addCourse(Course) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.post(`${environment.ApiURL}/Courses`, Course, httpOptions);
  }

  editCourse(id, Course) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.put(`${environment.ApiURL}/Courses/` + id, Course, httpOptions);
  }
  deleteCourse(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/Courses/` + id, this.httpHeader);
  }
}
