import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {NeedRequest} from '../Data_Types/NeedRequest'

@Injectable({
  providedIn: 'root'
})
export class NeedRequestService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
      "Authorization": "bearer " + localStorage.getItem('token')
    })
  };
  constructor(private httpclient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};
  getNeedrequest():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes`,this.httpHeader)
  }
  GetNeedRequestByManager():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetNeedRequestByManager`,this.httpHeader)
  }
  GetPendingNeedRequest():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetPendingNeedRequest`,this.httpHeader)
  }
  GetPendingNeedRequestByManager():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetPendingNeedRequestByManager`,this.httpHeader)
  }
  GetApprovedNeedRequest():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetApprovedNeedRequest`,this.httpHeader)
  }
  GetApprovedNeedRequestByManager():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetApprovedNeedRequestByManager`,this.httpHeader)
  }

  GetDisApprovedNeedRequest():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetDisApprovedNeedRequest`,this.httpHeader)
  }
  GetDisApprovedNeedRequestByManager():Observable<any>
  {
    return this.httpclient.get<any>(`${environment.ApiURL}/NeedRequestDTOes/GetDisApprovedNeedRequestByManager`,this.httpHeader)
  }
  approve(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/AcceptNeedRequest/`+id,this.httpOptions)
  }
  disapprove(id):Observable<any>
  {
    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/RejectNeedRequest/`+id,this.httpOptions)
  }

  getNeedrequestcategories()
  {
    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/GetNeedRequestCategories`,this.httpHeader)
  }
  getNeedrequestByID(Id)
  {
    console.log(Id);
    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/`+Id,this.httpHeader);

  }
   res:any;
  GetNeedRequestsByCategoryId(categoryId){
  //  console.log("catttttttt",categoryId);
    this.res=categoryId;
    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/GetNeedRequestsByCategoryId/` + categoryId, this.httpHeader);
  }

  GetNeedRequestsBySubCategoryId(SubCategoryId){
    //  console.log("catttttttt",SubCategoryId);
      return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/GetNeedRequestsByCategoryId/` + SubCategoryId, this.httpHeader);
    }
  GetNeedRequestsByEmployeeId(EmpID){
    console.log(EmpID);
    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/GetNeedRequestforEmployee/` + EmpID, this.httpHeader);
  }

  GetNeedRequestsByEmployeeIdByCategoryId(EmpID,categoryId){
   // console.log("twi ids",EmpID,categoryId);
    //var config = { params: { one: EmpID, two: CatID } } 
    EmpID= localStorage.getItem("id");
    categoryId=this.res;
    console.log("cat id",categoryId);

    return this.httpclient.get(`${environment.ApiURL}/NeedRequestDTOes/GetNeedRequestforEmployeeByCategory/${EmpID}/${categoryId}`, this.httpHeader);
  }
addNeedRequest(needRequest:NeedRequest)
{
const httpheader={headers:new HttpHeaders({
  'Content-Type':'application/json',
  'accept':'*/*'
})};
const httpOptions={headers:new HttpHeaders({
  'Content-Type':'application/json',
})};
return this.httpclient.post(`${environment.ApiURL}/NeedRequestDTOes`,needRequest,httpOptions);
}

addNeedRequestEmp(needRequest:NeedRequest)
{
const httpheader={headers:new HttpHeaders({
  'Content-Type':'application/json',
  'accept':'*/*'
})};
const httpOptions={headers:new HttpHeaders({
  'Content-Type':'application/json',
})};
return this.httpclient.post(`${environment.ApiURL}/NeedRequestDTOes/PostNeedRequestEmp`,needRequest,httpOptions);
}

editNeedRequest(id,needrequest)
{
  const httpheader={headers:new HttpHeaders({
    'Content-Type':'application/json',
    'accept':'*/*'
  })};
  const httpOptions={headers:new HttpHeaders({
    'Content-Type':'application/json',
  })};
  return this.httpclient.put(`${environment.ApiURL}/NeedRequestDTOes/`+id,needrequest,httpOptions);
  }
  deleteNeedRequest(Id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpclient.delete(`${environment.ApiURL}/NeedRequestDTOes/` + Id, this.httpHeader);
  }
}









